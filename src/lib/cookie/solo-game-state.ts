'use server';

import { COOKIE_NAMES } from './names';
import { setCookie } from './store';

/**
 * GameState を保存
 */
export const saveGameState = async (gameState: GameState) => {
  // データが大きすぎて無理だった
  await setCookie(COOKIE_NAMES.SOLO_GAME_STATE, JSON.stringify(gameState));
};
