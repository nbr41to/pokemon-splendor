// 'use client';

import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { Settings, User } from 'lucide-react';
import Link from 'next/link';
import { RoomList } from './_components/room-list';

export default async function Page() {
  const { data: rooms, error } = await supabase.from('Rooms').select('*');
  const parsedRooms =
    rooms?.map((room) => ({
      ...room,
      players: room.players as RoomPlayer[],
    })) || [];

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex grow flex-col items-center justify-center gap-y-8">
      <h1 className="">部屋いちらん</h1>
      <RoomList rooms={parsedRooms} />

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
