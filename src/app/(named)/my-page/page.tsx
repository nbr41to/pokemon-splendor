import { Button } from '@/components/ui/button';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { deleteCookie, getCookie } from '@/lib/cookie/store';
import { Layers, Search, X } from 'lucide-react';
import Link from 'next/link';
import { SwitchSprites } from './_components/switch-sprites';

export default async function Page() {
  const playerId = await getCookie(COOKIE_NAMES.PLAYER_ID);
  const playerName = await getCookie(COOKIE_NAMES.PLAYER_NAME);

  const spritesType = await getCookie(COOKIE_NAMES.SPRITES_TYPE);

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

      <h1 className="font-bold">マイページ（今はデバック用）</h1>
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

      {/* <Button disabled onClick={saveJson}>
        saveJson
      </Button> */}
    </div>
  );
}
