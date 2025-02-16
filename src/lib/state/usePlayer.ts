import useSWR from 'swr';
import TOKENS from '@/constants/tokens.json';
import { create } from 'zustand';

const INITIAL_DATA = {
  id: 1,
  name: 'Player',
  pokemons: [],
  tokens: {
    token1: {
      quantity: 0,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    },
    token2: {
      quantity: 0,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
    },
    token3: {
      quantity: 0,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sitrus-berry.png',
    },
    token4: {
      quantity: 0,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png',
    },
    token5: {
      quantity: 0,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/big-nugget.png',
    },
  },
  score: 0,
};

type State = {
  player: Player;
};
type Actions = {
  setPlayer: (player: Player) => void;
  setTokens: (tokens: Record<TokenKey, Token>) => void;
  addTokens: (tokens: Record<TokenKey, Token>) => void;
  incrementToken: (key: TokenKey) => void;
  decrementToken: (key: TokenKey) => void;
};

export const usePlayer = create<State & Actions>((set) => ({
  player: INITIAL_DATA,
  setPlayer: (player) => set({ player }),
  setTokens: (tokens) =>
    set((state) => ({ player: { ...state.player, tokens } })),
  addTokens: (tokens) =>
    set((state) => {
      const newTokens = { ...state.player.tokens };
      for (const key of Object.keys(tokens) as TokenKey[]) {
        newTokens[key].quantity += tokens[key].quantity;
      }

      return { player: { ...state.player, tokens: newTokens } };
    }),
  incrementToken: (key) => {
    set((state) => {
      const newTokens = { ...state.player.tokens };
      newTokens[key].quantity += 1;

      return { player: { ...state.player, tokens: newTokens } };
    });
  },
  decrementToken: (key) => {
    set((state) => {
      const newTokens = { ...state.player.tokens };
      newTokens[key].quantity -= 1;

      return { player: { ...state.player, tokens: newTokens } };
    });
  },
}));

// return useState;
// return {
//   player: useState((state) => state.player),
//   setPlayer: useState((state) => state.setPlayer),
//   setTokens: useState((state) => state.setTokens),
// };
// };
