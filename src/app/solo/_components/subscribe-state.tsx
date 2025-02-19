'use client';

import { Button } from '@/components/ui/button';
import { INITIAL_TOKENS } from '@/constants/initilalValue';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { startGame, turnEnd } from '@/utils/state';
import { nanoid } from 'nanoid';
import { Board } from './board';
import { PlayerBoard } from './player-board';

type Props = {
  // state: GameState;
  player: RoomPlayer;
  spritesType: string | undefined;
};

export const SubscribeState = ({
  player,
  spritesType = 'officialArtwork',
}: Props) => {
  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);
  const setMe = useMe((state) => state.setMe);
  const setSettings = useMe((state) => state.setSettings);

  const isStarted = state.players.length > 0;

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
      players: [initialPlayer],
      board: {
        ev1: [null, null, null, null],
        ev2: [null, null, null, null],
        ev3: [null, null, null, null],
      },
      tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
      currentPhase: 'action',
    } as GameState;

    setState(startGame(initialState));
    setMe(initialPlayer);
    setSettings({ sprites: spritesType });
  };

  const doTurnEnd = () => {
    const updatedState = turnEnd(state);
    // オンラインではプレイヤーの順番を変える処理が必要
    setState({
      ...updatedState,
      currentPhase: 'action',
    });
  };

  return (
    <div className="sm:mx-auto sm:w-fit">
      <Board />
      <PlayerBoard />

      {!isStarted && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-background/50"
          onClick={start}
          onKeyDown={start}
        >
          <Button className="rounded-full" size="lg" onClick={start}>
            Start
          </Button>
        </div>
      )}
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
