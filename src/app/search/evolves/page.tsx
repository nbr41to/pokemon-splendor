import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EvolveList } from './_components/evolve-list';
import { StagedPokemonSheet } from './_components/staged-pokemon-sheet';

export default function Page() {
  return (
    <div className="">
      <div className="sticky top-0 flex justify-between p-4">
        <div className="flex gap-x-4">
          <Button variant="link" asChild>
            <Link href="/my-page">マイページへ戻る</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/search"> ポケモン関連検索</Link>
          </Button>
        </div>

        <StagedPokemonSheet />
      </div>

      <EvolveList />
    </div>
  );
}
