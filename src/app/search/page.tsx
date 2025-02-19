import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SearchItem } from './_components/SearchItem';
import { SearchPokemon } from './_components/SearchPokemon';

export default function Page() {
  return (
    <div>
      <Button asChild>
        <Link href="/search/evolves">進化系統</Link>
      </Button>
      <div className="flex justify-center gap-x-8 p-8">
        <SearchItem />
        <SearchPokemon />
      </div>
    </div>
  );
}
