import { Button } from '@/components/ui/button';
import pokemonsData from '@/constants/generated/pokemons.json';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { deleteCookie, getCookie } from '@/lib/cookie/store';
import { Layers, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SwitchSprites } from './_components/switch-sprites';

export default async function Page() {
  const playerId = await getCookie(COOKIE_NAMES.PLAYER_ID);
  const playerName = await getCookie(COOKIE_NAMES.PLAYER_NAME);

  const spritesType = await getCookie(COOKIE_NAMES.SPRITES_TYPE);
  const getIds = JSON.parse(
    (await getCookie(COOKIE_NAMES.GET_IDS)) || '[]',
  ) as number[];

  const deleteName = async () => {
    'use server';
    await deleteCookie(COOKIE_NAMES.PLAYER_ID);
    await deleteCookie(COOKIE_NAMES.PLAYER_NAME);
  };

  const saveJson = async () => {
    // 'use server';
    // const data = await getAggregatedPokemons();
    // const json = JSON.stringify(data, null, 2);
    // const path = './src/constants/generated/pokemons.json';
    // fs.writeFileSync(path, json);
  };

  return (
    <div className="space-y-8 p-5">
      <div className="flex gap-x-4">
        <Button variant="link" asChild>
          <Link href="/search">
            <Search />
            ポケモン関連検索
          </Link>
        </Button>

        <Button variant="link" asChild>
          <Link href="/search/evolves">
            <Layers />
            進化系統一覧
          </Link>
        </Button>
      </div>

      {/* <Button disabled onClick={saveJson}>
        saveJson
      </Button> */}

      <h1 className="font-bold">マイページ</h1>
      <div className="flex items-center gap-x-4">
        <p>
          {playerId}: {playerName}
        </p>
        <Button
          size="icon"
          variant="destructive"
          className="size-6 rounded-full"
          onClick={deleteName}
        >
          <X />
        </Button>
      </div>
      <SwitchSprites value={spritesType} />

      <h2>図鑑</h2>
      <div className="flex flex-wrap gap-2">
        {getIds.sort().map((id) => {
          const pokemon = pokemonsData.find((p) => p.id === id);
          if (!pokemon) return <p> not found data</p>;

          return (
            <div key={id} className="flex flex-col items-center justify-center">
              <div className="relative size-20 rounded-full border">
                <Image
                  src={pokemon.sprites.default}
                  width={80}
                  height={80}
                  alt=""
                />
                <p className="absolute right-0 top-0 text-sm font-bold">
                  {pokemon.id}
                </p>
              </div>
              <p className="text-sm font-bold">{pokemon.name.ja}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
