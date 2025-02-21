import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <AppLogo />

      <Button
        className="h-16 rounded-full border-2 bg-blue-500 px-10 text-xl font-bold text-white hover:bg-blue-400 hover:text-white"
        variant="outline"
        asChild
      >
        <Link href="/menu">Start Game</Link>
      </Button>
    </div>
  );
}
