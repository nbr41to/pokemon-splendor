'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { INITIAL_TOKENS } from '@/constants/initilalValue';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { updateGameState } from '@/lib/supabase/actions';
import { removePlayer } from '@/utils/room';
import { startGame } from '@/utils/state';
import Form from 'next/form';
import { deleteRoom, toggleReady } from '../_utils/actions';

type Props = {
  playerId: string;
  room: Room;
};

export const Waiting = ({ playerId, room }: Props) => {
  const readyMe = room.players.find(
    (player) => player.id === playerId,
  )?.isReady;

  const isOwner = room.ownerId === playerId;

  const setState = useGameState((state) => state.setState);
  const setMe = useMe((state) => state.setMe);

  const gameStart = () => {
    const initialPlayers: Player[] = room.players.map((player) => ({
      id: player.id,
      name: player.name,
      pokemons: [],
      tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
      reservations: [],
    }));
    const initialState = startGame({
      id: room.id,
      turnCount: 1,
      players: initialPlayers,
      board: {
        ev1: [null, null, null, null],
        ev2: [null, null, null, null],
        ev3: [null, null, null, null],
      },
      tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
      currentPhase: 'action',
    });

    setState(initialState);
    setMe(initialPlayers.find((player) => player.id === playerId) as Player);

    updateGameState(room.id, initialState);
  };

  return (
    <div className="space-y-4">
      <h1>{room.name}</h1>
      <div className="flex gap-2">
        {room.players.map((player) => (
          <Card key={player.id} className="p-4">
            <div>{player.name}</div>
            <div>{player.isReady ? 'Ready!!' : 'Waiting...'}</div>
            {isOwner && player.id !== playerId && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removePlayer(room.id, player.id)}
              >
                Remove
              </Button>
            )}
          </Card>
        ))}
      </div>

      <Form action={toggleReady}>
        <input type="hidden" name="roomId" value={room.id} />
        <Button
          type="submit"
          className="w-full"
          variant={readyMe ? 'outline' : 'default'}
        >
          {readyMe ? 'Cancel Ready' : 'Ready'}
        </Button>
      </Form>

      <Button
        disabled={
          room.players.length < 2 ||
          room.players.some((p) => !p.isReady) ||
          !isOwner
        }
        className="w-full"
        onClick={gameStart}
      >
        Start
      </Button>
      <div className="w-screen overflow-x-scroll">
        <pre>{JSON.stringify(room, null, 2)}</pre>
      </div>

      <Button
        variant="destructive"
        disabled={!isOwner}
        onClick={() => deleteRoom(room.id)}
      >
        Delete Room
      </Button>
    </div>
  );
};
