'use client';

import React, { useMemo, useState } from 'react';

const KB = 1024;
const MB = 1024 * 1024;

const fmtKB = (bytes) => (bytes == null ? '–' : `${(bytes / KB).toLocaleString('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 })} KB`);
const fmtMB = (bytes) => (bytes == null ? '–' : `${(bytes / MB).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} MB`);
const fmtSize = (bytes) => (bytes == null ? '–' : bytes >= MB ? fmtMB(bytes) : fmtKB(bytes));
const pct = (part, whole) => (whole ? `${((part / whole) * 100).toFixed(1)}%` : '–');
const pad = (n) => String(n).padStart(2, '0');

function describe(values) {
  const v = values.filter((x) => typeof x === 'number').sort((a, b) => a - b);
  if (!v.length) return { n: 0, sum: 0, mean: null, median: null, std: null, min: null, max: null };
  const n = v.length;
  const sum = v.reduce((s, x) => s + x, 0);
  const mean = sum / n;
  const median = n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2;
  const std = n > 1 ? Math.sqrt(v.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1)) : 0;
  return { n, sum, mean, median, std, min: v[0], max: v[n - 1] };
}

function downloadCsv(filename, header, lines) {
  const esc = (val) => {
    if (val == null) return '';
    const s = String(val);
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const body = [header, ...lines].map((line) => line.map(esc).join(';')).join('\r\n');
  const blob = new Blob(['\uFEFF' + body], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const colors = {
  panel: 'linear-gradient(135deg, rgba(14, 20, 28, 0.96) 0%, rgba(10, 14, 20, 0.98) 65%, rgba(18, 14, 26, 0.95) 100%)',
  border: 'rgba(167, 139, 250, 0.28)',
  subtle: 'rgba(255, 255, 255, 0.08)',
  text: '#f4f4f5',
  muted: '#94a3b8',
  purple: '#c4b5fd',
  cyan: '#67e8f9',
};

const panelStyle = {
  background: colors.panel,
  border: `1px solid ${colors.border}`,
  borderRadius: '10px',
  padding: '1.1rem 1.25rem',
  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.35)',
};

const thStyle = {
  textAlign: 'left',
  padding: '0.55rem 0.65rem',
  fontSize: '11px',
  fontFamily: 'monospace',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: colors.muted,
  borderBottom: `1px solid ${colors.subtle}`,
  whiteSpace: 'nowrap',
  position: 'sticky',
  top: 0,
  background: '#0d1219',
};

const tdStyle = {
  padding: '0.45rem 0.65rem',
  fontSize: '12.5px',
  color: colors.text,
  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
  verticalAlign: 'top',
};

const numTd = { ...tdStyle, textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.5rem 0.9rem',
  borderRadius: '6px',
  fontSize: '12.5px',
  fontWeight: 600,
  cursor: 'pointer',
  background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.22) 0%, rgba(103, 232, 249, 0.12) 100%)',
  border: '1px solid rgba(167, 139, 250, 0.45)',
  color: '#ede9fe',
};

const inputStyle = {
  padding: '0.45rem 0.65rem',
  borderRadius: '6px',
  fontSize: '12.5px',
  background: 'rgba(255, 255, 255, 0.04)',
  border: `1px solid ${colors.subtle}`,
  color: colors.text,
};

function Kpi({ label, value, hint }) {
  return (
    <div style={{ ...panelStyle, padding: '0.9rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span style={{ fontSize: '10.5px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.07em', color: colors.muted }}>
        {label}
      </span>
      <span style={{ fontSize: '1.35rem', fontWeight: 600, color: colors.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      {hint ? <span style={{ fontSize: '11.5px', color: colors.muted, lineHeight: 1.35 }}>{hint}</span> : null}
    </div>
  );
}

export function GalleryMetricsView({ rows = [], generatedAt = null }) {
  const [group, setGroup] = useState('all');
  const [query, setQuery] = useState('');

  const groups = useMemo(() => Array.from(new Set(rows.map((r) => r.group))), [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (group === 'all' || r.group === group) &&
        (!q || [r.title, r.filename, r.previousFilename].some((v) => v && v.toLowerCase().includes(q))),
    );
  }, [rows, group, query]);

  const stats = useMemo(() => {
    const total = describe(filtered.map((r) => r.totalBytes));
    const full = describe(filtered.map((r) => r.imageBytes));
    const thumbs = describe(filtered.map((r) => r.thumbBytes));
    const largest = filtered.reduce((best, r) => (!best || r.totalBytes > best.totalBytes ? r : best), null);
    const smallest = filtered.reduce((best, r) => (!best || r.totalBytes < best.totalBytes ? r : best), null);
    const formats = filtered.reduce((acc, r) => {
      acc[r.format] = acc[r.format] || { count: 0, bytes: 0 };
      acc[r.format].count += 1;
      acc[r.format].bytes += r.imageBytes || 0;
      return acc;
    }, {});
    return {
      total,
      full,
      thumbs,
      largest,
      smallest,
      formats,
      missing: filtered.filter((r) => r.missingFile).length,
      noThumb: filtered.filter((r) => r.thumbBytes == null).length,
    };
  }, [filtered]);

  const summary = useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      const s = map.get(r.group) || { group: r.group, category: r.category, count: 0, full: 0, thumbs: 0, total: 0 };
      s.count += 1;
      s.full += r.imageBytes || 0;
      s.thumbs += r.thumbBytes || 0;
      s.total += r.totalBytes;
      map.set(r.group, s);
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [filtered]);

  const exportImages = () => {
    downloadCsv(
      `gallery-images-${new Date().toISOString().slice(0, 10)}.csv`,
      ['Category', 'Album', 'Nr', 'Title', 'Filename', 'Previous filename', 'Format', 'Width', 'Height', 'Status', 'Full-size bytes', 'Thumbnail bytes', 'Total bytes', 'Image path', 'Thumbnail path'],
      filtered.map((r) => [r.category, r.album || '', pad(r.order), r.title, r.filename, r.previousFilename || '', r.format, r.width || '', r.height || '', r.status, r.imageBytes ?? '', r.thumbBytes ?? '', r.totalBytes, r.imagePath || '', r.thumbPath || '']),
    );
  };

  const exportSummary = () => {
    downloadCsv(
      `gallery-summary-${new Date().toISOString().slice(0, 10)}.csv`,
      ['Group', 'Category', 'Images', 'Full-size bytes', 'Thumbnail bytes', 'Total bytes', 'Mean bytes per image'],
      summary.map((s) => [s.group, s.category, s.count, s.full, s.thumbs, s.total, Math.round(s.total / s.count)]),
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', padding: '0 0 3rem', fontFamily: 'inherit' }}>
      {/* Header */}
      <div style={{ ...panelStyle, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 600, color: '#fff' }}>Gallery Storage Metrics</h1>
          <p style={{ margin: '0.3rem 0 0', fontSize: '12.5px', color: colors.muted, maxWidth: '720px', lineHeight: 1.45 }}>
            Every gallery image with its sequence, current and previous filename, dimensions and file sizes (full-size and thumbnail).
            File sizes come from a manifest generated at build time{generatedAt ? ` (last generated ${new Date(generatedAt).toLocaleString('sv-SE')})` : ''}.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
          <button type="button" style={buttonStyle} onClick={exportImages}>
            Export images CSV
          </button>
          <button type="button" style={buttonStyle} onClick={exportSummary}>
            Export summary CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={group} onChange={(e) => setGroup(e.target.value)} style={inputStyle} aria-label="Filter by album or category">
          <option value="all">All albums and categories ({rows.length})</option>
          {groups.map((g) => (
            <option key={g} value={g}>
              {g} ({rows.filter((r) => r.group === g).length})
            </option>
          ))}
        </select>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title or filename…"
          style={{ ...inputStyle, minWidth: '240px' }}
          aria-label="Search images"
        />
        <span style={{ fontSize: '12px', color: colors.muted }}>
          Showing {filtered.length} of {rows.length} images
        </span>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem' }}>
        <Kpi label="Images" value={stats.total.n} hint={`${stats.missing} missing file · ${stats.noThumb} without thumbnail`} />
        <Kpi label="Total storage" value={fmtMB(stats.total.sum)} hint={`Full-size ${fmtMB(stats.full.sum)} · Thumbs ${fmtMB(stats.thumbs.sum)}`} />
        <Kpi label="Thumbnail share" value={pct(stats.thumbs.sum, stats.total.sum)} hint="Share of total bytes used by thumbnails" />
        <Kpi label="Mean per image" value={fmtSize(stats.total.mean)} hint={`Full ${fmtSize(stats.full.mean)} · Thumb ${fmtSize(stats.thumbs.mean)}`} />
        <Kpi label="Median per image" value={fmtSize(stats.total.median)} hint={`Std dev ${fmtSize(stats.total.std)}`} />
        <Kpi
          label="Min / Max"
          value={`${fmtSize(stats.total.min)} / ${fmtSize(stats.total.max)}`}
          hint={stats.largest ? `Largest: ${stats.largest.filename} (${stats.largest.group})` : null}
        />
      </div>

      {/* Format split + group summary */}
      <div style={{ ...panelStyle, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem', alignItems: 'baseline', borderBottom: `1px solid ${colors.subtle}` }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#fff' }}>Per album / category</h2>
          {Object.entries(stats.formats).map(([fmt, f]) => (
            <span key={fmt} style={{ fontSize: '12px', color: colors.muted, fontFamily: 'monospace' }}>
              <span style={{ color: colors.cyan }}>{fmt}</span> {f.count} files · {fmtMB(f.bytes)} full-size
            </span>
          ))}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Album / Category</th>
                <th style={thStyle}>Category</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Images</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Full-size</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Thumbnails</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Mean / image</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Share</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((s) => (
                <tr key={s.group}>
                  <td style={tdStyle}>
                    <button
                      type="button"
                      onClick={() => setGroup(s.group)}
                      style={{ background: 'none', border: 0, padding: 0, color: colors.purple, cursor: 'pointer', fontSize: '12.5px', textAlign: 'left' }}
                    >
                      {s.group}
                    </button>
                  </td>
                  <td style={{ ...tdStyle, color: colors.muted }}>{s.category}</td>
                  <td style={numTd}>{s.count}</td>
                  <td style={numTd}>{fmtMB(s.full)}</td>
                  <td style={numTd}>{fmtMB(s.thumbs)}</td>
                  <td style={{ ...numTd, fontWeight: 600 }}>{fmtMB(s.total)}</td>
                  <td style={numTd}>{fmtSize(s.total / s.count)}</td>
                  <td style={numTd}>{pct(s.total, stats.total.sum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image detail table */}
      <div style={{ ...panelStyle, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.85rem 1.1rem', borderBottom: `1px solid ${colors.subtle}` }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#fff' }}>Images</h2>
        </div>
        <div style={{ overflow: 'auto', maxHeight: '70vh' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Album / Category</th>
                <th style={thStyle}>Nr</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Filename</th>
                <th style={thStyle}>Previous filename</th>
                <th style={thStyle}>Format</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Dimensions</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Full-size</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Thumbnail</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} style={r.missingFile ? { background: 'rgba(248, 113, 113, 0.08)' } : undefined}>
                  <td style={{ ...tdStyle, color: colors.muted, whiteSpace: 'nowrap' }}>{r.group}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', color: colors.cyan }}>#{pad(r.order)}</td>
                  <td style={tdStyle}>
                    <a href={`/admin/collections/gallery-images/${r.id}`} style={{ color: colors.text, textDecoration: 'none' }}>
                      {r.title}
                    </a>
                    {r.status !== 'published' ? <span style={{ marginLeft: '0.4rem', fontSize: '10.5px', color: '#fbbf24' }}>{r.status}</span> : null}
                  </td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px' }}>{r.filename}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px', color: colors.muted }}>{r.previousFilename || '–'}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px' }}>{r.format}</td>
                  <td style={numTd}>{r.width && r.height ? `${r.width}×${r.height}` : '–'}</td>
                  <td style={numTd}>{r.missingFile ? <span style={{ color: '#fca5a5' }}>missing</span> : fmtKB(r.imageBytes)}</td>
                  <td style={numTd}>{fmtKB(r.thumbBytes)}</td>
                  <td style={{ ...numTd, fontWeight: 600 }}>{fmtKB(r.totalBytes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GalleryMetricsView;
