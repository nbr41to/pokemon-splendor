import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SearchItem } from './_components/SearchItem';
import { SearchPokemon } from './_components/SearchPokemon';

export default function Page() {
  return (
    <div className="">
      <div className="sticky top-0 flex w-fit flex-col items-start p-4">
        <Button variant="link" asChild>
          <Link href="/my-page">マイページへ戻る</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/search/evolves">進化系統一覧</Link>
        </Button>
      </div>

      <div className="flex justify-center gap-x-8">
        <SearchItem />
        <SearchPokemon />
      </div>
    </div>
  );
}
