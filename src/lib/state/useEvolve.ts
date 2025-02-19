import { create } from 'zustand';

type Evolve = Exclude<Pokemon['evolveCondition'], null> & {
  evolveFromUid: string;
  evolveFrom: number;
};
type State = {
  evolve: Evolve | null;
};
type Actions = {
  setEvolve: (evolve: Evolve | null) => void;
};

export const useEvolve = create<State & Actions>((set) => ({
  evolve: null,
  setEvolve: (evolve) => set({ evolve }),
}));
