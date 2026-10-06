import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetRedirect = searchParams.get('redirect') || '/blog';

  const draft = await draftMode();
  draft.disable();

  redirect(targetRedirect);
}
