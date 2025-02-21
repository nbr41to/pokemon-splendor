import { SaveNameDialog } from '@/components/features/save-name-dialog';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const playerName = await getCookie(COOKIE_NAMES.PLAYER_NAME);

  if (!playerName) return <SaveNameDialog />;

  return <div className="grow">{children}</div>;
}
