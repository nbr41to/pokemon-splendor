import { generatePokemon } from './generatePokemon';

/**
 * Board
 * provideBoardPokemon
 * null の slot にポケモンを追加
 */
export const provideBoardPokemon = (
  board: GameState['board'],
): GameState['board'] => {
  const newBoard = JSON.parse(JSON.stringify(board)) as GameState['board'];

  for (const index in board.ev1) {
    if (board.ev1[index] === null) {
      newBoard.ev1[index] = generatePokemon(1);
    }
  }
  for (const index in newBoard.ev2) {
    if (newBoard.ev2[index] === null) {
      newBoard.ev2[index] = generatePokemon(2);
    }
  }
  for (const index in newBoard.ev3) {
    if (newBoard.ev3[index] === null) {
      newBoard.ev3[index] = generatePokemon(3); // 一定の確率で非進化ポケモンが抽選される
    }
  }

  return newBoard;
};

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
