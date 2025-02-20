'use server';

import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';
import { supabase } from '@/lib/supabase/client';

export const toggleReady = async (formData: FormData) => {
  const roomId = formData.get('roomId') as string | undefined;
  const playerId = await getCookie(COOKIE_NAMES.PLAYER_ID);
  if (!roomId || !playerId) return;

  const { data: rooms } = await supabase
    .from('Rooms')
    .select('*')
    .eq('id', roomId);
  const players = rooms?.[0].players as RoomPlayer[];

  const { data, error } = await supabase
    .from('Rooms')
    .update({
      players: players.map((player) =>
        player.id === playerId
          ? { ...player, isReady: !player.isReady }
          : player,
      ),
    })
    .eq('id', roomId)
    .select();

  if (error) {
    console.error(error);
  }
};

// TODO: FormAction に変更（したと一緒や）
export const startGameAction = async (roomId: string, newState: GameState) => {
  // const { data: rooms } = await supabase
  //   .from('Rooms')
  //   .select('*')
  //   .eq('id', roomId);

  // if (!rooms) return;
  // const state = rooms[0].state as RoomPlayer[];

  const { data, error } = await supabase
    .from('Rooms')
    .update({
      state: newState,
    })
    .eq('id', roomId);

  if (error) return error;

  return;
};

// TODO: FormAction に変更
export const updateGameAction = async (roomId: string, newState: GameState) => {
  // const { data: rooms } = await supabase
  //   .from('Rooms')
  //   .select('*')
  //   .eq('id', roomId);

  // if (!rooms) return;
  // const state = rooms[0].state as RoomPlayer[];

  const { data, error } = await supabase
    .from('Rooms')
    .update({
      state: newState,
    })
    .eq('id', roomId);

  if (error) return error;

  return;
};
