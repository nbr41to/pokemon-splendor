'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Form from 'next/form';
import { toggleReady } from '../_utils/actions';

type Props = {
  playerId: string;
  room: Room;
};

export const Waiting = ({ playerId, room }: Props) => {
  const readyMe = room.players.find(
    (player) => player.id === playerId,
  )?.isReady;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {room.players.map((player) => (
          <Card key={player.id} className="p-4">
            <div>{player.name}</div>
            <div>{player.isReady ? 'Ready!!' : 'Waiting...'}</div>
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

      <Form action={toggleReady}>
        <input type="hidden" name="roomId" value={room.id} />
        <Button type="submit" className="w-full">
          Start
        </Button>
      </Form>

      <pre>{JSON.stringify(room, null, 2)}</pre>
    </div>
  );
};
