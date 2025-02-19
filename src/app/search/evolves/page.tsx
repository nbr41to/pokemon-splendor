import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { EvolveList } from './_components/evolve-list';
import { StagedPokemonSheet } from './_components/staged-pokemon-sheet';

export default function Page() {
  return (
    <div className="space-y-10 p-10">
      <h1 className="text-center font-bold">Evolves</h1>
      <div>
        <Button asChild>
          <Link href="/search">
            <Search />
            ポケモン関連検索
          </Link>
        </Button>
        <StagedPokemonSheet />
      </div>
      <EvolveList />
    </div>
  );
}
