import React from 'react';
import { DefaultTemplate } from '@payloadcms/next/templates';
import { SetStepNav } from '@payloadcms/ui';
import { SitemapView } from './SitemapView.js';

export function SitemapViewWrapper(props) {
  const { initPageResult, params, searchParams, payload, i18n } = props || {};
  const req = initPageResult?.req;
  const resolvedPayload = payload || req?.payload;
  const resolvedI18n = i18n || req?.i18n;
  const permissions = initPageResult?.permissions;
  const locale = initPageResult?.locale;
  const user = req?.user;

  // React 19 safety: plain shallow copy of collections & globals
  const rawVisibleEntities = initPageResult?.visibleEntities;
  const visibleEntities = {
    collections: rawVisibleEntities?.collections || {},
    globals: rawVisibleEntities?.globals || {},
  };

  if (!resolvedPayload) {
    return <SitemapView />;
  }

  return (
    <DefaultTemplate
      i18n={resolvedI18n}
      locale={locale}
      params={params}
      payload={resolvedPayload}
      permissions={permissions}
      req={req}
      searchParams={searchParams}
      user={user}
      visibleEntities={visibleEntities}
      viewType="custom"
    >
      <SetStepNav
        nav={[
          {
            label: 'Site Architecture & Map',
          },
        ]}
      />
      <SitemapView />
    </DefaultTemplate>
  );
}

export default SitemapViewWrapper;
