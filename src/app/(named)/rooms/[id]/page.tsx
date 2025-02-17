'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-yellow-200 via-red-300 to-pink-300">
      <div className="mx-auto grid w-fit place-items-center p-10">
        <h1 className="sr-only">Pokemon Splendor</h1>
        <Image
          className="drop-shadow-xl"
          src="logo-pokemon.png"
          alt="Pokemon"
          width={300}
          height={300}
        />
        <Image
          className="-mt-2 drop-shadow-xl"
          src="logo-splendor.png"
          alt="Splendor logo"
          width={280}
          height={300}
        />
      </div>
      <Button
        className="h-16 rounded-full border-2 bg-blue-500 px-10 text-xl font-bold text-white hover:bg-blue-400 hover:text-white"
        variant="outline"
        asChild
      >
        <Link href="/rooms">Start Game</Link>
      </Button>
    </div>
  );
}
