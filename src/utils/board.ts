/**
 * Boardからポケモンを取り除く
 */
export const removePokemonFromBoard = (
  board: GameState['board'],
  pokemonUid: string,
): GameState['board'] => {
  const newBoard = JSON.parse(JSON.stringify(board)) as GameState['board'];

  for (const key of Object.keys(newBoard) as (keyof GameState['board'])[]) {
    newBoard[key] = newBoard[key].map((pokemon) => {
      if (!pokemon) return null;
      if (pokemon.uid === pokemonUid) return null;
      return pokemon;
    });
  }

  return newBoard;
};
