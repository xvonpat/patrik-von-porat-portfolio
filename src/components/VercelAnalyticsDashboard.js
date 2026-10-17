import { unstable_cache } from 'next/cache';
import { Suspense } from 'react';
import styles from './VercelAnalyticsDashboard.module.css';

const CACHE_SECONDS = 15 * 60;
const API_BASE_URL = 'https://api.vercel.com/v1/query/web-analytics/visits';
const chartDateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
});

class VercelAnalyticsApiError extends Error {
  constructor(status) {
    super(`Vercel Web Analytics returned HTTP ${status}.`);
    this.status = status;
  }
}

const getCachedAnalytics = unstable_cache(
  async (projectId, teamId, teamSlug, since, until) => {
    const token = process.env.VERCEL_ACCESS_TOKEN;
    const commonParams = new URLSearchParams({ projectId, since, until });

    if (teamId) {
      commonParams.set('teamId', teamId);
    } else if (teamSlug) {
      commonParams.set('slug', teamSlug);
    }

    const topPagesParams = new URLSearchParams(commonParams);
    topPagesParams.set('by', 'requestPath');
    topPagesParams.set('limit', '6');

    const dailyPageviewsParams = new URLSearchParams(commonParams);
    dailyPageviewsParams.set('by', 'day');
    dailyPageviewsParams.set('limit', '100');

    const [summaryResponse, pagesResponse, dailyPageviewsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/count?${commonParams}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
      fetch(`${API_BASE_URL}/aggregate?${topPagesParams}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
      fetch(`${API_BASE_URL}/aggregate?${dailyPageviewsParams}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
    ]);

    if (!summaryResponse.ok) {
      throw new VercelAnalyticsApiError(summaryResponse.status);
    }

    if (!pagesResponse.ok) {
      throw new VercelAnalyticsApiError(pagesResponse.status);
    }

    if (!dailyPageviewsResponse.ok) {
      throw new VercelAnalyticsApiError(dailyPageviewsResponse.status);
    }

    const [summary, pages, dailyPageviewsResponseData] = await Promise.all([
      summaryResponse.json(),
      pagesResponse.json(),
      dailyPageviewsResponse.json(),
    ]);
    const totals = summary?.data;

    if (
      !Number.isFinite(totals?.visitors) ||
      totals.visitors < 0 ||
      !Number.isFinite(totals?.pageviews) ||
      totals.pageviews < 0 ||
      !Array.isArray(pages?.data) ||
      !Array.isArray(dailyPageviewsResponseData?.data)
    ) {
      throw new Error('Vercel Web Analytics returned an invalid response.');
    }

    const topPages = pages.data
      .filter((page) => page?.requestPath !== 'Others')
      .map((page) => {
        if (
          typeof page?.requestPath !== 'string' ||
          !Number.isFinite(page?.pageviews) ||
          page.pageviews < 0
        ) {
          throw new Error('Vercel Web Analytics returned an invalid page breakdown.');
        }

        return { path: page.requestPath, pageviews: page.pageviews };
      })
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 5);
    const dailyPageviewsByDate = new Map();

    for (const day of dailyPageviewsResponseData.data) {
      const timestamp = Date.parse(day?.timestamp);
      if (
        !Number.isFinite(timestamp) ||
        !Number.isFinite(day?.pageviews) ||
        day.pageviews < 0
      ) {
        throw new Error('Vercel Web Analytics returned an invalid daily breakdown.');
      }

      dailyPageviewsByDate.set(
        new Date(timestamp).toISOString().slice(0, 10),
        day.pageviews,
      );
    }

    const dailyPageviews = [];
    const currentDay = new Date(`${since}T00:00:00.000Z`);
    const lastDay = new Date(`${until}T00:00:00.000Z`);

    while (currentDay <= lastDay) {
      const date = currentDay.toISOString().slice(0, 10);
      dailyPageviews.push({
        date,
        pageviews: dailyPageviewsByDate.get(date) ?? 0,
      });
      currentDay.setUTCDate(currentDay.getUTCDate() + 1);
    }

    return {
      visitors: totals.visitors,
      pageviews: totals.pageviews,
      topPages,
      dailyPageviews,
      updatedAt: new Date().toISOString(),
    };
  },
  ['vercel-web-analytics-dashboard-v2'],
  { revalidate: CACHE_SECONDS },
);

function getDateWindow() {
  const today = new Date();
  const until = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const since = new Date(until);
  since.setUTCDate(since.getUTCDate() - 29);

  return {
    since: since.toISOString().slice(0, 10),
    until: until.toISOString().slice(0, 10),
  };
}

function DashboardCard({ children, dateRange, title, status = 'ready', updatedAt }) {
  return (
    <section
      aria-busy={status === 'loading'}
      aria-labelledby="vercel-analytics-title"
      aria-live={status === 'loading' ? 'polite' : undefined}
      className={styles.card}
      role={status === 'error' ? 'alert' : undefined}
      style={{
        background: '#0e0e12',
        border: '1px solid rgba(56, 189, 248, 0.22)',
        borderRadius: '10px',
        marginBottom: 'var(--base, 1.5rem)',
        padding: 'calc(var(--base, 1rem) * 1.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '1rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '6px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </span>
          <div>
            <h2
              id="vercel-analytics-title"
              style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, color: '#ffffff' }}
            >
              {title}
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', margin: '0.15rem 0 0' }}>
              Source: Vercel Web Analytics
              {dateRange && ` · Last 30 days (${dateRange.since} – ${dateRange.until} UTC)`}
            </p>
          </div>
        </div>

        <span
          style={{
            color: '#a1a1aa',
            fontSize: '0.75rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            padding: '0.25rem 0.6rem',
            borderRadius: '999px',
          }}
        >
          Updated: {updatedAt ? `${dateTimeFormatter.format(new Date(updatedAt))} UTC` : 'Pending'}
        </span>
      </div>

      {children}
    </section>
  );
}

function StatusCard({ children, dateRange, status = 'error', title = 'Vercel Web Analytics' }) {
  return (
    <DashboardCard dateRange={dateRange} status={status} title={title}>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#a1a1aa' }}>{children}</p>
    </DashboardCard>
  );
}

function Metric({ label, value }) {
  return (
    <div
      style={{
        background: '#14141a',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
      }}
    >
      <div style={{ color: '#a1a1aa', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.45rem', fontWeight: 600, color: '#f4f4f5', marginTop: '0.15rem' }}>{value}</div>
    </div>
  );
}

function DailyPageviewsChart({ days }) {
  const maxPageviews = Math.max(...days.map((day) => day.pageviews));
  const firstDay = days[0];
  const middleDay = days[Math.floor(days.length / 2)];
  const lastDay = days[days.length - 1];

  return (
    <section
      aria-describedby="daily-pageviews-description"
      aria-labelledby="daily-pageviews-title"
      style={{ marginTop: 'var(--base)' }}
    >
      <h3 id="daily-pageviews-title" style={{ fontSize: '0.95rem', margin: '0 0 0.25rem' }}>
        Daily page views
      </h3>
      <p
        id="daily-pageviews-description"
        style={{ color: 'var(--theme-elevation-500)', fontSize: '0.8rem', margin: '0 0 0.5rem' }}
      >
        {maxPageviews === 0
          ? 'No page views recorded during this period.'
          : 'Daily totals for the 30-day period. Focus or hover a bar for its date and value.'}
      </p>
      <div
        aria-label="Daily page views for 30 days"
        role="group"
        style={{
          borderBottom: '1px solid var(--theme-elevation-150)',
          display: 'grid',
          gap: '2px',
          gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
          height: '5rem',
        }}
      >
        {days.map((day) => {
          const label = `${chartDateFormatter.format(new Date(`${day.date}T00:00:00.000Z`))}: ${day.pageviews.toLocaleString()} page views`;

          return (
            <button
              key={day.date}
              aria-label={label}
              title={label}
              type="button"
              style={{
                alignItems: 'flex-end',
                background: 'transparent',
                border: 0,
                cursor: 'help',
                display: 'flex',
                justifyContent: 'center',
                minWidth: 0,
                padding: 0,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  background: 'var(--theme-elevation-500)',
                  borderRadius: '2px 2px 0 0',
                  height: `${maxPageviews === 0 ? 2 : Math.max(2, (day.pageviews / maxPageviews) * 100)}%`,
                  width: '100%',
                }}
              />
            </button>
          );
        })}
      </div>
      <div
        aria-hidden="true"
        style={{
          color: 'var(--theme-elevation-500)',
          display: 'flex',
          fontSize: '0.7rem',
          justifyContent: 'space-between',
          paddingTop: '0.25rem',
        }}
      >
        <span>{chartDateFormatter.format(new Date(`${firstDay.date}T00:00:00.000Z`))}</span>
        <span>{chartDateFormatter.format(new Date(`${middleDay.date}T00:00:00.000Z`))}</span>
        <span>{chartDateFormatter.format(new Date(`${lastDay.date}T00:00:00.000Z`))}</span>
      </div>
    </section>
  );
}

async function AnalyticsOverview() {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const teamSlug = process.env.VERCEL_TEAM_SLUG;
  const dateRange = getDateWindow();

  if (!token || !projectId) {
    const missingVariables = [
      !token && 'VERCEL_ACCESS_TOKEN',
      !projectId && 'VERCEL_PROJECT_ID',
    ].filter(Boolean);

    return (
      <StatusCard dateRange={dateRange}>
        Missing server environment variable{missingVariables.length > 1 ? 's' : ''}:{' '}
        {missingVariables.join(', ')}.
      </StatusCard>
    );
  }

  if (teamId && teamSlug) {
    return (
      <StatusCard dateRange={dateRange}>
        Configure only one of VERCEL_TEAM_ID or VERCEL_TEAM_SLUG for this Vercel team project.
      </StatusCard>
    );
  }

  const { since, until } = dateRange;
  let analytics;

  try {
    analytics = await getCachedAnalytics(
      projectId,
      teamId || null,
      teamSlug || null,
      since,
      until,
    );
  } catch (error) {
    const message =
      error instanceof VercelAnalyticsApiError
        ? `${error.message} Check the token's project/team access and Web Analytics availability.`
        : 'Could not load analytics from Vercel. Check the server connection and try again later.';

    return <StatusCard dateRange={dateRange}>{message}</StatusCard>;
  }

  const hasTraffic = analytics.visitors > 0 || analytics.pageviews > 0;

  return (
    <DashboardCard dateRange={dateRange} title="Vercel Web Analytics" updatedAt={analytics.updatedAt}>
      <div
        style={{
          display: 'grid',
          gap: 'var(--base)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        }}
      >
        <Metric label="Visitors" value={analytics.visitors.toLocaleString()} />
        <Metric label="Page views" value={analytics.pageviews.toLocaleString()} />
      </div>
      <DailyPageviewsChart days={analytics.dailyPageviews} />
      {hasTraffic ? (
        <>
          <h3 style={{ fontSize: '0.95rem', margin: 'var(--base) 0 0.5rem' }}>
            Top pages
          </h3>
          {analytics.topPages.length > 0 ? (
            <ol style={{ listStyleType: 'decimal', margin: 0, paddingLeft: '1.5rem' }}>
              {analytics.topPages.map((page) => (
                <li key={page.path} style={{ padding: '0.25rem 0' }}>
                  <div
                    style={{
                      display: 'grid',
                      gap: '1rem',
                      gridTemplateColumns: 'minmax(0, 1fr) auto',
                    }}
                  >
                    <span style={{ overflowWrap: 'anywhere' }}>{page.path}</span>
                    <span>{page.pageviews.toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p style={{ margin: 0 }}>No page breakdowns are available for this period.</p>
          )}
        </>
      ) : (
        <p style={{ margin: 'var(--base) 0 0' }}>No traffic recorded in this period.</p>
      )}
    </DashboardCard>
  );
}

export function VercelAnalyticsDashboard() {
  const dateRange = getDateWindow();

  return (
    <Suspense
      fallback={
        <DashboardCard dateRange={dateRange} status="loading" title="Vercel Web Analytics">
          <p style={{ margin: 0 }}>Loading analytics…</p>
        </DashboardCard>
      }
    >
      <AnalyticsOverview />
    </Suspense>
  );
}
