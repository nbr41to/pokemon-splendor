'use server';

import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';
import { supabase } from '@/lib/supabase/client';
import { nanoid } from 'nanoid';

export const createRoom = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const playerId = await getCookie(COOKIE_NAMES.PLAYER_ID);
  const playerName = await getCookie(COOKIE_NAMES.PLAYER_NAME);

  if (!playerId || !playerName) return;

  const { data, error } = await supabase
    .from('Rooms')
    .insert([
      {
        id: nanoid(8),
        name,
        ownerId: playerId,
        players: [
          {
            id: playerId,
            name: playerName,
            isReady: false,
          },
        ],
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
