export const calcScore = (pokemons: Pokemon[]) => {
  return pokemons.reduce((acc, pokemon) => {
    return acc + pokemon.points;
  }, 0);
};
