import { INITIAL_TOKENS } from '@/constants/initilalValue';

/**
 * calcFixedTokens
 * @param player
 * 固定トークンを計算する
 */
export const calcFixedTokens = (player: Player) => {
  const pokemons = player.pokemons;
  const fixedTokens = pokemons.reduce(
    (acc, pokemon) => {
      const { fixedTokens } = pokemon;

      for (const type of Object.keys(fixedTokens) as TokenType[]) {
        if (fixedTokens[type].quantity > 0) {
          acc[type] = {
            ...acc[type],
            quantity: acc[type].quantity + fixedTokens[type].quantity,
          };
        }
      }

      return acc;
    },
    JSON.parse(JSON.stringify(INITIAL_TOKENS)) as Tokens,
  );

  return fixedTokens;
};

/**
 * calcFixedTokens
 * @param player
 * トークンの合計を計算する
 */
export const calcTotalTokens = (player: Player) => {
  const fixedTokens = calcFixedTokens(player);
  const playerTokens = player.tokens;

  const totalTokens = Object.keys(playerTokens).reduce(
    (acc, key) => {
      acc[key as TokenType] = {
        quantity:
          playerTokens[key as TokenType].quantity +
          fixedTokens[key as TokenType].quantity,
        spriteUrl: '',
      };

      return acc;
    },
    JSON.parse(JSON.stringify(INITIAL_TOKENS)) as Tokens,
  );

  return totalTokens;
};
