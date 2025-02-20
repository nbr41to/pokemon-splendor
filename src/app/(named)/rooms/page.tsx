// 'use client';

import { Button } from '@/components/ui/button';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';
import { supabase } from '@/lib/supabase/client';
import { Settings, User } from 'lucide-react';
import Link from 'next/link';
import { RoomList } from './_components/room-list';

export default async function Page() {
  const playerId = (await getCookie(COOKIE_NAMES.PLAYER_ID)) as string;
  const playerName = (await getCookie(COOKIE_NAMES.PLAYER_NAME)) as string;
  const { data: rooms, error } = await supabase
    .from('Rooms')
    .select('*')
    .is('state', null);
  const parsedRooms =
    rooms?.map((room) => ({
      ...room,
      players: room.players as RoomPlayer[],
      state: room.state as GameState,
    })) || [];

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex grow flex-col items-center justify-center gap-y-8">
      <h1 className="">部屋いちらん</h1>
      <RoomList
        rooms={parsedRooms}
        player={{
          id: playerId,
          name: playerName,
          isReady: false,
        }}
      />

      <Button asChild>
        <Link href="/solo">
          <User />
          一人プレイ
        </Link>
      </Button>

      <Button asChild>
        <Link href="/my-page">
          <Settings />
          マイページ
        </Link>
      </Button>
    </div>
  );
}
