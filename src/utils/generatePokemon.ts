import pokemonsData from '@/constants/generated/pokemons.json';
import STAGED_POKEMON_IDS from '@/constants/staged-pokemons-0.1.json';

import {
  generateEvolveToken,
  generateFixedTokens,
  generateRequiredTokens,
} from '@/utils/generateTokens';
import { nanoid } from 'nanoid';

const STAGED_POKEMONS = pokemonsData.filter((pokemon) =>
  STAGED_POKEMON_IDS.includes(pokemon.id),
);
const POKEMONS = {
  EV1: STAGED_POKEMONS.filter(
    (pokemon) => pokemon.evolvesFrom === null && pokemon.evolvesTo,
  ),
  EV2: STAGED_POKEMONS.filter(
    (pokemon) => pokemon.evolvesFrom && pokemon.evolvesTo,
  ),
  EV3: STAGED_POKEMONS.filter(
    (pokemon) => pokemon.evolvesFrom && pokemon.evolvesTo === null,
  ),
};

export const generatePokemon = (ev: 1 | 2 | 3): Pokemon => {
  const pokemons = POKEMONS[`EV${ev}`];
  const pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
  const shiny = Math.random() < 0.05; // 5  % chance of shiny
  const requiredTokens = generateRequiredTokens(
    ev * 3,
    ev * 3 + ev + ev,
    ev < 3 ? 4 : 2,
  );
  const requiredTotalTokenQuantity = Object.keys(requiredTokens).reduce(
    (acc, key) => acc + requiredTokens[key as TokenType].quantity,
    0,
  );

  const evolveCondition =
    pokemon.evolvesTo && ev !== 3
      ? {
          evolveTo: pokemon.evolvesTo,
          spriteUrl: STAGED_POKEMONS.find(
            (pokemons) => pokemons.id === pokemon.evolvesTo[0],
          )?.sprites.officialArtwork.default as string,
          requiredToken: generateEvolveToken(ev),
        }
      : null;

  return {
    uid: nanoid(10),
    id: pokemon.id,
    name: pokemon.name.ja,
    points:
      ev === 1
        ? Math.floor(Math.random() * 1.5)
        : ev === 2
          ? Math.floor(Math.random() * 4 + requiredTotalTokenQuantity / 3)
          : Math.floor(Math.random() * 2 + requiredTotalTokenQuantity / 2),
    spriteUrl: shiny
      ? pokemon.sprites.officialArtwork.shiny
      : pokemon.sprites.officialArtwork.default,
    requiredTokens: generateRequiredTokens(ev * 3, ev * 3 + ev, ev < 3 ? 4 : 2),
    fixedTokens: generateFixedTokens(ev < 3 ? 1 : 2, pokemon.types),
    evolveFrom: pokemon.evolvesFrom,
    evolveCondition: evolveCondition,
  };
};
