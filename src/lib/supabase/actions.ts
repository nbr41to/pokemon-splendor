'use state';

import { supabase } from './client';

/**
 * GameState の更新
 */
export const updateGameState = async (roomId: string, newState: GameState) => {
  const { data, error } = await supabase
    .from('Rooms')
    .update({
      state: newState,
    })
    .eq('id', roomId);

  if (error) return error;

  return;
};
