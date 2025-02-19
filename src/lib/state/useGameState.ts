import { INITIAL_TOKENS } from '@/constants/initilalValue';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

type State = {
  state: GameState;
};
type Actions = {
  setState: (state: GameState) => void;
};

const INITIAL_STATE = JSON.parse(
  JSON.stringify({
    id: nanoid(8),
    players: [],
    board: {
      ev1: [null, null, null, null],
      ev2: [null, null, null, null],
      ev3: [null, null, null, null],
    },
    tokens: INITIAL_TOKENS,
    currentPhase: 'action',
  }),
);
export const useGameState = create<State & Actions>((set) => ({
  /* States */
  state: INITIAL_STATE,

  /* Actions */
  setState: (state: GameState) => set({ state }),
}));
