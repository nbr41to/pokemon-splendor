/**
 * calcScore
 * @param pokemons
 * 勝利点の合計を計算する
 */
export const calcScore = (pokemons: Pokemon[]) => {
  return pokemons.reduce((acc, pokemon) => {
    return acc + pokemon.points;
  }, 0);
};
