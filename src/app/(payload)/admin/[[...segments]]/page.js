import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import config from '../../../../../payload.config.ts';

export const generateMetadata = async ({ params, searchParams }) =>
  generatePageMetadata({
    config,
    params: await params,
    searchParams: await searchParams,
  });

const Page = async ({ params, searchParams }) =>
  RootPage({
    config,
    params: await params,
    searchParams: await searchParams,
  });

export default Page;
