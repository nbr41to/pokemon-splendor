const INITIAL_TOKENS = {
  token1: { quantity: 0, spriteUrl: '' },
  token2: { quantity: 0, spriteUrl: '' },
  token3: { quantity: 0, spriteUrl: '' },
  token4: { quantity: 0, spriteUrl: '' },
  token5: { quantity: 0, spriteUrl: '' },
};

export const calcFixedTokens = (player: Player) => {
  const pokemons = player.pokemons;
  const fixedTokens = pokemons.reduce(
    (acc, pokemon) => {
      const pokemonHasTokens = pokemon.tokens;

      for (const token of Object.keys(pokemonHasTokens)) {
        if (pokemonHasTokens[token as TokenKey].quantity > 0) {
          acc[token as TokenKey] = {
            ...acc[token as TokenKey],
            quantity:
              acc[token as TokenKey].quantity +
              pokemonHasTokens[token as TokenKey].quantity,
          };
        }
      }

      return acc;
    },
    INITIAL_TOKENS as Record<TokenKey, Token>,
  );

  return fixedTokens;
};

export const calcTotalTokens = (player: Player) => {
  const fixedTokens = calcFixedTokens(player);
  const playerTokens = player.tokens;

  const totalTokens = Object.keys(playerTokens).reduce(
    (acc, key) => {
      acc[key as TokenKey] = {
        quantity:
          playerTokens[key as TokenKey].quantity +
          fixedTokens[key as TokenKey].quantity,
        spriteUrl: '',
      };

      return acc;
    },
    INITIAL_TOKENS as Record<TokenKey, Token>,
  );

  return totalTokens;
};
