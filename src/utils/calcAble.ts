import { calcFixedTokens } from './calcTokens';

/**
 * calcScore
 * @param pokemons
 * @param Player
 * ポケモンが進化可能かを計算する
 */
export const calcEvolvable = (
  pokemon: Pokemon,
  player: Player,
  board: GameState['board'],
): boolean => {
  if (!pokemon.evolveCondition) return false;
  const evolveToPokemons = [...board.ev1, ...board.ev2, ...board.ev3].filter(
    (p) => p?.evolveFrom === pokemon.id,
  );
  if (evolveToPokemons.length < 1) return false;

  const fixedTokens = calcFixedTokens(player);

  return (
    fixedTokens[pokemon.evolveCondition.requiredToken.type].quantity >=
    pokemon.evolveCondition.requiredToken.quantity
  );
};

/**
 * calcScore
 * @param player
 * Player が進化可能なポケモンを持っているかを計算する
 */
export const calcHasEvolvable = (
  player: Player,
  board: GameState['board'],
): boolean => {
  const fixedTokens = calcFixedTokens(player);

  return player.pokemons.some((pokemon) => {
    if (!pokemon.evolveCondition) return false;

    const isExistEvolveTo = [...board.ev1, ...board.ev2, ...board.ev3].some(
      (p) => (p?.id ? pokemon.evolveCondition?.evolveTo.includes(p.id) : false),
    );
    const {
      requiredToken: { type, quantity },
    } = pokemon.evolveCondition;

    return fixedTokens[type].quantity >= quantity && isExistEvolveTo;
  });
};
