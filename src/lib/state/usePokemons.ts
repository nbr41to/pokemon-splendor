import useSWR from 'swr';
import POKEMONS_EV1 from '@/constants/pokemons-ev1.json';
import POKEMONS_EV2 from '@/constants/pokemons-ev2.json';
import POKEMONS_EV3 from '@/constants/pokemons-ev3.json';
import { getRequiredTokens, getTokens } from '@/utils/getTokens';
import { create } from 'zustand';

const IGNORE_EVOLUTION_IDS = [26]; // ライチュウだけ進化しない
const getPokemons = (pokemons, canEvolution: boolean): Pokemon[] => {
  return pokemons.map((pokemon) => {
    const shiny = Math.random() < 0.2; // 20% chance of shiny
    const points = Math.floor(Math.random() * 2); // 0 or 1 point
    const evolutionSprites = [
      ...POKEMONS_EV1,
      ...POKEMONS_EV2,
      ...POKEMONS_EV3,
    ].find((pokemons) => pokemons.id === pokemon.id + 1)?.sprites;
    const evolution =
      canEvolution && !IGNORE_EVOLUTION_IDS.includes(pokemon.id)
        ? {
            id: pokemon.id + 1,
            spriteUrl: evolutionSprites?.officialArtwork.default,
          }
        : null;

    return {
      ...pokemon,
      points,
      spriteUrl: shiny
        ? pokemon.sprites.officialArtwork.shiny
        : pokemon.sprites.officialArtwork.default,
      requiredTokens: getRequiredTokens(),
      tokens: getTokens(),
      evolution: evolution,
    };
  });
};

export const usePokemons = create<{
  pokemons: {
    ev1: Pokemon[];
    ev2: Pokemon[];
    ev3: Pokemon[];
  };
}>((set) => ({
  pokemons: {
    ev1: getPokemons(POKEMONS_EV1, true),
    ev2: getPokemons(POKEMONS_EV2, true),
    ev3: getPokemons(POKEMONS_EV3, false),
  },
}));
