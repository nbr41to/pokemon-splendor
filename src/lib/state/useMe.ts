import { INITIAL_TOKENS } from '@/constants/initilalValue';
import { create } from 'zustand';

type State = {
  player: Player;
  isReserving: boolean;
};
type Actions = {
  setMe: (player: Player) => void;
  setIsReserving: (isReserving: boolean) => void;
};

export const useMe = create<State & Actions>((set) => ({
  player: {
    id: '',
    name: '',
    pokemons: [],
    tokens: INITIAL_TOKENS,
    reservations: [],
  },
  isReserving: false,
  setMe: (player) => set({ player }),
  setIsReserving: (isReserving) => set({ isReserving }),
}));
