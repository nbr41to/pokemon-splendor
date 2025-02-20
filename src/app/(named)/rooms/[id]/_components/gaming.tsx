'use client';

import { Board } from '@/components/features/game/board';
import { PlayerBoard } from '@/components/features/game/player-board';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';

export const Gaming = () => {
  const me = useMe((state) => state.player);
  const state = useGameState((state) => state.state);

  return (
    <div className="pb-40 sm:mx-auto sm:w-fit">
      <Board />
      <PlayerBoard />

      {state.players[0].id === me.id ? (
        <div className="fixed bottom-0 left-0 z-20 w-full bg-background/50 bg-red-500 py-2 text-center font-bold text-white">
          あなたの番です
        </div>
      ) : (
        <div className="fixed inset-0 z-20 h-screen w-screen" />
      )}
    </div>
  );
};
