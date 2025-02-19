import { INITIAL_TOKENS } from '@/constants/initilalValue';
import { create } from 'zustand';

type State = {
  settings: {
    sprites: string;
  };
  player: Player;
  isReserving: boolean;
};
type Actions = {
  setSettings: (settings: State['settings']) => void;
  setMe: (player: Player) => void;
  setIsReserving: (isReserving: boolean) => void;
};

export const useMe = create<State & Actions>((set) => ({
  settings: {
    sprites: 'officialArtwork',
  },
  player: {
    id: '',
    name: '',
    pokemons: [],
    tokens: INITIAL_TOKENS,
    reservations: [],
  },
  isReserving: false,

  setSettings: (settings) => set({ settings }),
  setMe: (player) => set({ player }),
  setIsReserving: (isReserving) => set({ isReserving }),
}));
