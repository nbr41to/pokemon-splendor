import stagedPokemons from '@/constants/staged-pokemons-0.1.json';
import { create } from 'zustand';

/* GM */
type State = {
  pokemonIds: number[];
};
type Actions = {
  addPokemon: (id: number) => void;
  removePokemon: (id: number) => void;
  clearPokemons: () => void;
};
export const useStagedPokemons = create<State & Actions>((set) => ({
  pokemonIds: stagedPokemons,
  addPokemon: (id) =>
    set((state) => {
      const pokemonIds = state.pokemonIds.slice();
      pokemonIds.push(id);
      return { pokemonIds };
    }),
  removePokemon: (id) =>
    set((state) => {
      const pokemonIds = state.pokemonIds.filter(
        (pokemonId) => pokemonId !== id,
      );
      return { pokemonIds };
    }),
  clearPokemons: () => set({ pokemonIds: [] }),
}));
