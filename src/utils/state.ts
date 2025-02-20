import { addGetCollection } from '@/lib/cookie/collection';
import { provideBoardPokemon, removePokemonFromBoard } from './board';
import { calcHasEvolvable } from './calcAble';
import { calcFixedTokens } from './calcTokens';

// GameState を渡すだけで、なにかしらの変更後の GameState を返す utils 関数

/**
 * GameState
 * startGame
 * Game を開始する
 */
export const startGame = (state: GameState): GameState => {
  const newState: GameState = JSON.parse(JSON.stringify(state));

  // ポケモンの補充
  newState.board = provideBoardPokemon(newState.board);

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
 * GameState
 * getTokens
 * トークンをもらう
 */
export const getTokens = (
  state: GameState,
  tokenTypes: TokenType[],
): GameState => {
  const newState: GameState = JSON.parse(JSON.stringify(state));
  const currentPlayer = newState.players[0];

  // トークンの追加
  for (const tokenType of tokenTypes) {
    currentPlayer.tokens[tokenType].quantity += 1;
    newState.tokens[tokenType].quantity -= 1;
  }
  // Phase の移行
  newState.currentPhase = calcHasEvolvable(currentPlayer, newState.board)
    ? 'evolve'
    : 'waiting-end';

  return newState;
};

/**
 * GameState
 * reservePokemon
 * ポケモンを予約する
 */
export const reservePokemon = (
  state: GameState,
  pokemon: Pokemon,
): GameState => {
  const newState: GameState = JSON.parse(JSON.stringify(state));
  const currentPlayer = newState.players[0];

  // ポケモンを予約リストに追加
  currentPlayer.reservations.push(pokemon);
  // ポケモンを場から削除
  newState.board = removePokemonFromBoard(newState.board, pokemon.uid);
  // gold トークンの追加
  currentPlayer.tokens.gold.quantity += 1;
  // Phase の移行
  newState.currentPhase = calcHasEvolvable(currentPlayer, newState.board)
    ? 'evolve'
    : 'waiting-end';

  return newState;
};

/**
 * GameState
 * getPokemon
 * ポケモンをゲットする
 */
export const getPokemon = (
  state: GameState,
  pokemon: Pokemon,
  inReservation = false,
): GameState => {
  const newState: GameState = JSON.parse(JSON.stringify(state));
  const currentPlayer = newState.players[0];
  const currentPlayerFixedTokens = calcFixedTokens(currentPlayer);

  // トークンの消費
  for (const key of Object.keys(pokemon.requiredTokens) as TokenType[]) {
    const requiredToken = pokemon.requiredTokens[key];
    const discountTokenQuantity =
      requiredToken.quantity - currentPlayerFixedTokens[key].quantity || 0;

    if (discountTokenQuantity > 0) {
      currentPlayer.tokens[key].quantity -= discountTokenQuantity;
      newState.tokens[key].quantity += discountTokenQuantity;
    }
  }
  // ポケモンをプレイヤーに追加
  currentPlayer.pokemons.push(pokemon);
  // ポケモンを削除
  if (inReservation) {
    // 予約リストから
    currentPlayer.reservations = currentPlayer.reservations.filter(
      (p) => p.uid !== pokemon.uid,
    );
  } else {
    // 場から
    newState.board = removePokemonFromBoard(newState.board, pokemon.uid);
  }
  // Phase の移行
  newState.currentPhase = calcHasEvolvable(currentPlayer, newState.board)
    ? 'evolve'
    : 'waiting-end';

  // 図鑑の登録
  addGetCollection(pokemon.id);

  return newState;
};

/**
 * GameState
 * evolvePokemon
 * @pokemon 進化先のポケモン
 * @targetUid 進化元のポケモンの uid
 * ポケモンを進化する
 */
export const evolvePokemon = (
  state: GameState,
  pokemon: Pokemon,
  targetUid: string,
  inReservation = false,
): GameState => {
  const newState: GameState = JSON.parse(JSON.stringify(state));
  const currentPlayer = newState.players[0];

  // ポケモンを削除
  if (inReservation) {
    // 予約リストから
    currentPlayer.reservations = currentPlayer.reservations.filter(
      (p) => p.uid !== pokemon.uid,
    );
  } else {
    // 場から
    newState.board = removePokemonFromBoard(newState.board, pokemon.uid);
  }
  // 進化元のポケモンを削除
  currentPlayer.pokemons = currentPlayer.pokemons.filter(
    (p) => p.uid !== targetUid,
  );
  // 進化後のポケモンを追加
  currentPlayer.pokemons.push(pokemon);
  // Phase の移行
  newState.currentPhase = 'waiting-end';

  return newState;
};

export const cancelEvolve = (state: GameState): GameState => {
  const newState: GameState = JSON.parse(JSON.stringify(state));
  newState.currentPhase = 'waiting-end';

  return newState;
};

/**
 * GameState
 * turnEnd
 * ターンエンド
 */
export const turnEnd = (state: GameState): GameState => {
  const newState: GameState = JSON.parse(JSON.stringify(state));
  // ポケモンの補充
  newState.board = provideBoardPokemon(newState.board);
  // Phase の初期化
  newState.currentPhase = 'action';
  // ターン数のincrement
  newState.turnCount += 1;
  // プレイヤー順番を変更
  newState.players.push(newState.players.shift() as Player);

  return newState;
};
