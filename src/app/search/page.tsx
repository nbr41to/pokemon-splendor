import { SearchItem } from './_components/SearchItem';
import { SearchPokemon } from './_components/SearchPokemon';

export default function Page() {
  return (
    <div className="flex justify-center gap-x-8 p-8">
      <SearchItem />
      <SearchPokemon />
    </div>
  );
}
