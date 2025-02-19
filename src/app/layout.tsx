import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'Pokemon Splendor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.variable}`}>
        <div className="flex min-h-svh flex-col bg-gradient-to-br from-yellow-200 via-red-300 to-pink-300">
          {children}
        </div>
      </body>
    </html>
  );
}
