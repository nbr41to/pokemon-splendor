'use client';

import { Board } from '@/components/features/game/board';
import { PlayerBoard } from '@/components/features/game/player-board';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { supabase } from '@/lib/supabase/client';
import { turnEnd } from '@/utils/state';
import { useEffect, useState } from 'react';
import { updateGameAction } from '../_utils/actions';
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
  const [room, setRoom] = useState<Room>(rawRoom);
  const setSettings = useMe((state) => state.setSettings);

  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);
  const setMe = useMe((state) => state.setMe);

  useEffect(() => {
    setState(room.state as GameState);
    setSettings({ sprites: spritesType });
  }, [spritesType, setSettings, setState, room.state]);

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
            const state = payload.new.state as GameState;
            setState(state);
            const me = state.players.find(
              (player) => player.id === playerId,
            ) as Player;
            setMe(me);
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
  }, [setState, setMe, playerId]);

  const doTurnEnd = () => {
    const updatedState = turnEnd(state);
    // オンラインではプレイヤーの順番を変える処理が必要
    setState({
      ...updatedState,
      currentPhase: 'action',
    });

    updateGameAction(room.id, updatedState);
  };

  return (
    <div>
      {!state ? (
        <Waiting playerId={playerId} room={room} />
      ) : (
        <div className="sm:mx-auto sm:w-fit">
          <Board />
          <PlayerBoard />
          {state.players[0].id === playerId && (
            <div className="fixed right-2 top-2 z-10 rounded-lg bg-background/50 bg-red-500 p-2 text-white">
              あなたの番です
            </div>
          )}
          {/* 
      {!isStarted &&
        (!room.state ? (
          <div
            className="fixed inset-0 z-10 flex items-center justify-center bg-background/50"
            onClick={start}
            onKeyDown={start}
          >
            <Button className="rounded-full" size="lg" onClick={start}>
              Start
            </Button>
          </div>
        ) : (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-background/50">
            <Button className="rounded-full" size="lg" onClick={start}>
              Continue??
            </Button>
            <Button className="rounded-full" size="lg" onClick={start}>
              No
            </Button>
          </div>
        ))} */}
          {state.currentPhase === 'waiting-end' && (
            <div
              className="fixed inset-0 z-10 flex items-center justify-center bg-background/50"
              onClick={doTurnEnd}
              onKeyDown={doTurnEnd}
            >
              <Button className="rounded-full" size="lg">
                End
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
