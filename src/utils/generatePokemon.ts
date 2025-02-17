import POKEMONS_EV1 from '@/constants/pokemons-ev1.json';
import POKEMONS_EV2 from '@/constants/pokemons-ev2.json';
import POKEMONS_EV3 from '@/constants/pokemons-ev3.json';
import {
  generateEvolveToken,
  generateRequiredTokens,
  getTokens,
} from '@/utils/generateTokens';

const POKEMONS = {
  ev1: POKEMONS_EV1,
  ev2: POKEMONS_EV2,
  ev3: POKEMONS_EV3,
};
const IGNORE_EVOLUTION_IDS = [26]; // ライチュウだけ進化しない

export const generatePokemon = (ev: 1 | 2 | 3): Pokemon => {
  const pokemons = POKEMONS[`ev${ev}`];
  const pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
  const shiny = Math.random() < 0.05; // 5  % chance of shiny
  const requiredTokens = generateRequiredTokens(
    ev * 3,
    ev * 3 + ev + ev,
    ev < 3 ? 4 : 2,
  );
  const requiredTotalTokenQuantity = Object.keys(requiredTokens).reduce(
    (acc, key) => acc + requiredTokens[key as TokenKey].quantity,
    0,
  );
  const evolutionSprites = [
    ...POKEMONS_EV1,
    ...POKEMONS_EV2,
    ...POKEMONS_EV3,
  ].find((pokemons) => pokemons.id === pokemon.id + 1)?.sprites;
  const evolution =
    ev !== 3 && !IGNORE_EVOLUTION_IDS.includes(pokemon.id)
      ? {
          id: pokemon.id + 1,
          spriteUrl: evolutionSprites?.officialArtwork.default as string,
          requiredToken: generateEvolveToken(ev) as EvolutionRequiredToken,
        }
      : null;

  return {
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
    tokens: getTokens(ev < 3 ? 1 : 2),
    evolution: evolution,
  };
};
