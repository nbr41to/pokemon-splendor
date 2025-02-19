import pokemonsData from '@/constants/generated/pokemons.json';
import STAGED_POKEMON_IDS from '@/constants/staged-pokemons-0.1.json';
import TOKEN from '@/constants/token.json';

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
  OTHERS: STAGED_POKEMONS.filter(
    (pokemon) => pokemon.evolvesFrom === null && pokemon.evolvesTo === null,
  ),
};

export const generatePokemon = (ev: 1 | 2 | 3): Pokemon => {
  // evが3のときに非進化のポケモンの抽選
  const isLegendary =
    POKEMONS.OTHERS.length > 0 && ev === 3 ? Math.random() < 0.1 : false; // 10 % chance of legendary
  const pokemons = isLegendary ? POKEMONS.OTHERS : POKEMONS[`EV${ev}`];
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
  const evolveToPokemon = STAGED_POKEMONS.find(
    (p) => p.evolvesFrom === pokemon.id,
  );
  const evolveCondition =
    pokemon.evolvesTo && evolveToPokemon && ev !== 3
      ? {
          evolveTo: pokemon.evolvesTo,
          sprites: {
            default: {
              default: evolveToPokemon.sprites.default,
              shiny: evolveToPokemon.sprites.front_shiny,
            },
            officialArtwork: {
              default: evolveToPokemon.sprites.officialArtwork.default,
              shiny: evolveToPokemon.sprites.officialArtwork.shiny,
            },
          },
          requiredToken: generateEvolveToken(ev),
        }
      : null;

  if (isLegendary) {
    requiredTokens.gold = {
      quantity: 1,
      spriteUrl: TOKEN.GOLD.SPRITE_URL,
    };
  }

  return {
    uid: nanoid(10),
    id: pokemon.id,
    name: pokemon.name.ja,
    shiny: shiny,
    points:
      ev === 1
        ? Math.floor(Math.random() * 1.5)
        : ev === 2
          ? Math.floor(Math.random() * 4 + requiredTotalTokenQuantity / 3)
          : Math.floor(Math.random() * 2 + requiredTotalTokenQuantity / 2),
    sprites: {
      default: {
        default: pokemon.sprites.default,
        shiny: pokemon.sprites.front_shiny,
      },
      officialArtwork: {
        default: pokemon.sprites.officialArtwork.default,
        shiny: pokemon.sprites.officialArtwork.shiny,
      },
    },
    requiredTokens: requiredTokens,
    fixedTokens: isLegendary
      ? generateFixedTokens(2, pokemon.types)
      : generateFixedTokens(1, pokemon.types),
    evolveFrom: pokemon.evolvesFrom,
    evolveCondition: evolveCondition,
  };
};
