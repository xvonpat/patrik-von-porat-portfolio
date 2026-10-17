import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views';
import config from '../../../../../payload.config.ts';
import { importMap } from '../importMap.js';

export const generateMetadata = async ({ params, searchParams }) =>
  generatePageMetadata({
    config,
    params: await params,
    searchParams: await searchParams,
  });

const Page = async ({ params, searchParams }) =>
  NotFoundPage({
    config,
    importMap,
    params: await params,
    searchParams: await searchParams,
  });

export default Page;
