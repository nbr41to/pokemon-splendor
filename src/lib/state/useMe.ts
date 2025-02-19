import { INITIAL_TOKENS } from '@/constants/initilalValue';
import { create } from 'zustand';

type State = {
  player: Player;
};
type Actions = {
  setMe: (player: Player) => void;
};

export const useMe = create<State & Actions>((set) => ({
  player: {
    id: '',
    name: '',
    pokemons: [],
    tokens: INITIAL_TOKENS,
    reservations: [],
  },
  setMe: (player) => set({ player }),
}));
