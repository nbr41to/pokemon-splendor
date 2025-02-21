'use client';

import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { joinRoom } from '@/utils/room';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  rooms: Room[];
  player: RoomPlayer;
};
export const RoomList = ({ rooms: rawRooms, player }: Props) => {
  const [rooms, setRooms] = useState<Room[]>(rawRooms);
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('current-rooms')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Rooms' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setRooms([...rooms, payload.new as Room]);
          }
          if (payload.eventType === 'UPDATE') {
            setRooms(
              rooms.map((room) =>
                room.id === payload.new.id ? (payload.new.room as Room) : room,
              ),
            );
          }
          if (payload.eventType === 'DELETE') {
            setRooms(rooms.filter((room) => room.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [rooms]);

  return (
    <div className="w-full space-y-3">
      {rooms.map((room) => {
        const handleOnClick = async () => {
          const alreadyJoined = room.players.some((p) => p.id === player.id);
          if (alreadyJoined) {
            router.push(`/rooms/${room.id}`);
            return;
          }

          const error = await joinRoom(room.id, player);
          if (error) return console.error(error);

          router.push(`/rooms/${room.id}`);
        };

        if (!room) return null;

        return (
          <Button
            key={room.id}
            className="relative flex w-full items-center justify-between px-4 py-6"
            variant="outline"
            onClick={handleOnClick}
          >
            <h2 className="text-lg font-bold">{room.name}</h2>

            <p>
              <span className="mr-3 font-normal">{room.players.length}/4</span>
              {room.players.find((p) => p.id === room.ownerId)?.name}
            </p>
          </Button>
        );
      })}
    </div>
  );
};
