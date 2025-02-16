'use client';

import { Button } from '@/components/ui/button';
import TOKENS from '@/constants/tokens.json';
import Image from 'next/image';
import { PlayerBoard } from './_components/PlayerBoard';
import { PokemonsBoard } from './_components/PokemonsBoard';
import { TokensBoard } from './_components/TokensBoard';

export default function Page() {
  return (
    <div className="flex flex-wrap gap-4">
      <PokemonsBoard />
      <div>
        <TokensBoard />
        <PlayerBoard />
      </div>
    </div>
  );
}
