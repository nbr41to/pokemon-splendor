'use client';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Waiting } from './waiting';

type Props = {
  playerId: string;
  room: Room;
};

export const SubscribeRoom = ({ playerId, room: rawRoom }: Props) => {
  const [room, setRoom] = useState<Room>(rawRoom);

  useEffect(() => {
    const channel = supabase
      .channel('current-rooms')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Rooms' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setRoom(payload.new as Room);
          }
          if (payload.eventType === 'UPDATE') {
            setRoom(payload.new as Room);
          }
          if (payload.eventType === 'DELETE') {
            // 退室処理
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <Waiting playerId={playerId} room={room} />
    </div>
  );
};
