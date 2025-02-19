import { generatePokemon } from './generatePokemon';

// GameState を渡すだけで、なにかしらの変更後の GameState を返す utils 関数

/**
 * startGame
 * Game を開始する
 */
export const startGame = (state: GameState): GameState => {
  let newState: GameState = JSON.parse(JSON.stringify(state));

  // ポケモンの補充
  newState = provideBoardPokemon(newState);

  // プレイヤーのシャッフル
  newState.players = newState.players.sort(() => Math.random() - 0.5);

  // 場のトークンの追加
  for (const value of Object.values(newState.tokens)) {
    value.quantity =
      newState.players.length === 4 ? 7 : newState.players.length === 3 ? 5 : 4;
  }

  return newState;
};

/**
 * provideBoardPokemon
 * null の slot にポケモンを追加
 */
export const provideBoardPokemon = (state: GameState): GameState => {
  const board = { ...state.board };

  for (const index in board.ev1) {
    if (board.ev1[index] === null) {
      board.ev1[index] = generatePokemon(1);
    }
  }

  for (const index in board.ev2) {
    if (board.ev2[index] === null) {
      board.ev2[index] = generatePokemon(2);
    }
  }

  for (const index in board.ev3) {
    if (board.ev3[index] === null) {
      board.ev3[index] = generatePokemon(3);
    }
  }

  return { ...state, board };
};
