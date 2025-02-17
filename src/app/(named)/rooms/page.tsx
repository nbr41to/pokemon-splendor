'use client';

import { Button } from '@/components/ui/button';
import { Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-y-8">
      <h1 className="">部屋いちらん</h1>
      <div>へや</div>
      <div>へや</div>
      <Button asChild>
        <Link href="/my-page">
          <Settings />
          マイページ
        </Link>
      </Button>
      <Button asChild>
        <Link href="/solo">
          <User />
          一人プレイ
        </Link>
      </Button>
    </div>
  );
}
