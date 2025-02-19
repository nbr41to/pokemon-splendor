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

export const startGame = async (formData: FormData) => {
  const roomId = formData.get('roomId') as string | undefined;

  if (!roomId) return;

  const { data: rooms } = await supabase
    .from('Rooms')
    .select('*')
    .eq('id', roomId);
  const players = rooms?.[0].players as RoomPlayer[];

  // const { data, error } = await supabase
  //   .from('Rooms')
  //   .update({
  //     state: {
  //       id: roomId,
  //       players: Player[];
  //       board: {
  //         ev1: (Pokemon | null)[];
  //         ev2: (Pokemon | null)[];
  //         ev3: (Pokemon | null)[];
  //       };
  //       tokens: Record<TokenKey, Token>;
  //       currentPlayer: Player;
  //       currentPhase: 'action'
  //     } as GameState,
  //   })
  //   .eq('id', roomId)
  //   .select();
};
