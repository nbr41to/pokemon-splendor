// 'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';
import { supabase } from '@/lib/supabase/client';
import { Settings, UserRound, UsersRound } from 'lucide-react';
import Link from 'next/link';

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
    <div className="flex grow flex-col items-center justify-center gap-y-4">
      <AppLogo />

      <Button
        className="rounded-full bg-orange-500 font-bold text-white hover:bg-orange-400 hover:text-white"
        size="lg"
        variant="outline"
        asChild
      >
        <Link href="/rooms">
          <UsersRound />
          ともだちとあそぶ
        </Link>
      </Button>

      <Button
        className="rounded-full bg-[#F5E1DA] font-bold hover:bg-[#F5E1DA99]"
        size="lg"
        variant="outline"
        asChild
      >
        <Link href="/solo">
          <UserRound />
          ひとりであそぶ
        </Link>
      </Button>

      <Button
        className="rounded-full bg-blue-600 font-bold text-white hover:bg-blue-500 hover:text-white"
        size="lg"
        variant="outline"
        asChild
      >
        <Link href="/my-page">
          <Settings />
          マイページ
        </Link>
      </Button>
    </div>
  );
}
