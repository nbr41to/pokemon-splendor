import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';
import { supabase } from '@/lib/supabase/client';
import {} from 'lucide-react';
import { SubscribeRoom } from './_components/subscribe-room';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const playerId = (await getCookie(COOKIE_NAMES.PLAYER_ID)) as string;
  const spritesType = (await getCookie(COOKIE_NAMES.SPRITES_TYPE)) as string;

  const { data: rooms, error } = await supabase
    .from('Rooms')
    .select('*')
    .eq('id', id);
  const parsedRoom = rooms?.[0]
    ? {
        ...rooms[0],
        players: rooms[0].players as RoomPlayer[],
        state: rooms[0].state as GameState,
      }
    : null;

  if (parsedRoom === null) return <div>部屋が見つかりませんでした</div>;
  if (error) {
    console.error(error);
  }

  return (
    <div className="flex grow flex-col items-center justify-center gap-y-8">
      <h1 className="">部屋</h1>
      <SubscribeRoom
        playerId={playerId}
        room={parsedRoom}
        spritesType={spritesType}
      />
    </div>
  );
}
