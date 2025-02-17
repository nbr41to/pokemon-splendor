// import fs from 'node:fs';
import { Button } from '@/components/ui/button';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { deleteCookie, getCookie } from '@/lib/cookie/store';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const playerName = await getCookie(COOKIE_NAMES.PLAYER_NAME);
  const deleteName = async () => {
    'use server';
    await deleteCookie(COOKIE_NAMES.PLAYER_NAME);
  };

  const saveJson = async () => {
    'use server';

    return;

    // const data = await getAggregatedItems();

    // const json = JSON.stringify(data, null, 2);
    // const path = './src/constants/generated/items.json';

    // fs.writeFileSync(path, json);
  };

  return (
    <div className="p-10">
      <h1>マイページ（デバック用）</h1>
      <div className="flex items-center gap-x-4">
        <p>name: {playerName}</p>
        <Button size="sm" onClick={deleteName}>
          名前を消す
        </Button>
      </div>
      <Button disabled onClick={saveJson}>
        saveJson
      </Button>

      <Button asChild>
        <Link href="/search">
          <Search />
          検索
        </Link>
      </Button>
    </div>
  );
}
