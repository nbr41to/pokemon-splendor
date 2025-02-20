import { supabase } from '@/lib/supabase/client';

/**
 * joinRoom
 * 部屋に参加
 */
export const joinRoom = async (roomId: string, roomPlayer: RoomPlayer) => {
  const { data: rooms } = await supabase
    .from('Rooms')
    .select('*')
    .eq('id', roomId);
  if (!rooms) return;
  const players = rooms[0].players as RoomPlayer[];
  players.push(roomPlayer);
  const { data, error } = await supabase
    .from('Rooms')
    .update({ players })
    .eq('id', roomId);

  if (error) {
    return error;
  }

  return;
};

/**
 * joinRoom
 * 部屋に参加
 */
export const removePlayer = async (roomId: string, playerId: string) => {
  const { data: rooms } = await supabase
    .from('Rooms')
    .select('*')
    .eq('id', roomId);
  if (!rooms) return;

  const players = rooms[0].players as RoomPlayer[];
  const newPlayers = players.filter((player) => player.id !== playerId);

  const { data, error } = await supabase
    .from('Rooms')
    .update({ players: newPlayers })
    .eq('id', roomId);

  if (error) {
    return error;
  }

  return;
};
