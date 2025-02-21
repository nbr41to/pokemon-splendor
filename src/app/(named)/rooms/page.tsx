import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';
import { supabase } from '@/lib/supabase/client';
import {} from 'lucide-react';
import { CreateRoomButton } from './_components/create-room-button';
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
    <div className="mx-auto flex w-full max-w-xl grow flex-col items-center justify-center gap-y-8 p-5">
      <h1 className="py-4">みんなのへや</h1>
      <RoomList
        rooms={parsedRooms}
        player={{
          id: playerId,
          name: playerName,
          isReady: false,
        }}
      />

      <CreateRoomButton />
    </div>
  );
}
