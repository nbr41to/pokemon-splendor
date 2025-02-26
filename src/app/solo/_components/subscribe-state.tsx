'use client';

import { Board } from '@/components/features/game/board';
import { PlayerBoard } from '@/components/features/game/player-board';
import { Button } from '@/components/ui/button';
import { INITIAL_TOKENS } from '@/constants/initilalValue';
import { saveGameState } from '@/lib/cookie/solo-game-state';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { startGame, turnEnd } from '@/utils/state';
import { nanoid } from 'nanoid';
import { useState } from 'react';

type Props = {
  gameState: GameState | null;
  player: RoomPlayer;
  spritesType: string | undefined;
};

export const SubscribeState = ({
  gameState,
  player,
  spritesType = 'officialArtwork',
}: Props) => {
  const [isStarted, setIsStarted] = useState(false);
  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);
  const setMe = useMe((state) => state.setMe);
  const setSettings = useMe((state) => state.setSettings);

  const start = () => {
    const initialPlayer: Player = {
      id: player.id,
      name: player.name,
      pokemons: [],
      tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
      reservations: [],
    };
    const initialState = {
      id: nanoid(8),
      turnCount: 0,
      players: [initialPlayer],
      board: {
        ev1: [null, null, null, null],
        ev2: [null, null, null, null],
        ev3: [null, null, null, null],
      },
      tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
      currentPhase: 'action',
    } as GameState;
    const newState = startGame(initialState);

    setState(newState);
    setMe(newState.players[0]);
    setSettings({ sprites: spritesType });
    setIsStarted(true);
  };
  const continueGame = () => {
    // setState(startGame(gameState));
    // setMe(gameState.players[0]);
    setSettings({ sprites: spritesType });
    setIsStarted(true);
  };

  const doTurnEnd = () => {
    const updatedState = turnEnd(state);
    // オンラインではプレイヤーの順番を変える処理が必要
    setState({
      ...updatedState,
      currentPhase: 'action',
    });
    saveGameState(updatedState);
  };

  return (
    <div className="sm:mx-auto sm:w-fit">
      <Board />
      <PlayerBoard />

      {!isStarted &&
        (!gameState ? (
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
            <Button className="rounded-full" size="lg" onClick={continueGame}>
              Continue??
            </Button>
            <Button className="rounded-full" size="lg" onClick={start}>
              No
            </Button>
          </div>
        ))}
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
  );
};
