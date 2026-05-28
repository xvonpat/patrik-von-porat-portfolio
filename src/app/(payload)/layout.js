import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap.js';
import configPromise from '../../../payload.config.ts';
import React from 'react';

import '@payloadcms/next/css';

const serverFunction = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

const Layout = ({ children }) => (
  <RootLayout 
    config={configPromise} 
    importMap={importMap} 
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
);

export default Layout;
