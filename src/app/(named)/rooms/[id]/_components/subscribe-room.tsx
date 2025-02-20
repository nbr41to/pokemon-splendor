'use client';

import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useReducer, useState } from 'react';
import { Gaming } from './gaming';
import { Waiting } from './waiting';

type Props = {
  playerId: string;
  room: Room;
  spritesType: string;
};

export const SubscribeRoom = ({
  playerId,
  room: rawRoom,
  spritesType,
}: Props) => {
  const router = useRouter();
  const [room, setRoom] = useState<Room>(rawRoom);
  const [injected, injection] = useReducer(() => true, false);

  const setState = useGameState((state) => state.setState);
  const setSettings = useMe((state) => state.setSettings);
  const setMe = useMe((state) => state.setMe);

  useEffect(() => {
    /* 初回のみstoreに値をセット */
    if (injected) return;
    setState(room.state as GameState);
    setMe(
      room.state?.players.find((player) => player.id === playerId) as Player,
    );
    setSettings({ sprites: spritesType });
    injection();
  }, [
    spritesType,
    setSettings,
    setState,
    room.state,
    playerId,
    setMe,
    injected,
  ]);

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
            const room = payload.new as Room;
            const isKicked = room.players.every(
              (player) => player.id !== playerId,
            );
            if (isKicked) {
              // 蹴られた場合
              router.push('/rooms');
              return;
            }
            setRoom(room);
            if (!room.state) return;

            const state = room.state;
            setState(state);
            const me = state.players.find(
              (player) => player.id === playerId,
            ) as Player;
            setMe(me);
          }
          if (payload.eventType === 'DELETE') {
            // 部屋が削除された場合
            router.push('/rooms');
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setState, setMe, playerId, router.push]);

  return (
    <div>
      {!room.state ? (
        <Waiting playerId={playerId} room={room} />
      ) : injected ? (
        <Gaming />
      ) : (
        <>loading...</>
      )}
    </div>
  );
};
