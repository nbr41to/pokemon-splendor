'use server';

import { COOKIE_NAMES } from './names';
import { getCookie, setCookie } from './store';

/**
 * 図鑑に登録
 */
export const addGetCollection = async (pokemonId: number) => {
  const currents = JSON.parse((await getCookie(COOKIE_NAMES.GET_IDS)) || '[]');

  if (currents.includes(pokemonId)) return;

  currents.push(pokemonId);
  await setCookie(COOKIE_NAMES.GET_IDS, JSON.stringify(currents));
};

/**
 * 進化アチーブメントに登録
 * @param evolveToId 進化後のポケモンの ID
 */
export const addEvolveCollection = async (evolveToId: number) => {
  const currents = JSON.parse(
    (await getCookie(COOKIE_NAMES.EVOLVED_IDS)) || '[]',
  );

  if (currents.includes(evolveToId)) currents.push(evolveToId);
  await setCookie(COOKIE_NAMES.EVOLVED_IDS, JSON.stringify(currents));
};
