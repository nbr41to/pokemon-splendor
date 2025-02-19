import { nanoid } from 'nanoid';
import { COOKIE_NAMES } from './names';
import { getCookie, setCookie } from './store';

/* Unused */
const INITIAL_SETTINGS = {
  id: nanoid(8),
  name: '-',
  spritesType: 'officialArtwork',
  getIds: [],
  evolvedIds: [],
};

export const createPlayerSettings = async (name: string) => {
  const settings = await getCookie(COOKIE_NAMES.PLAYER_SETTINGS);

  if (settings) {
    const currentSettings = JSON.parse(settings);
    setCookie(
      COOKIE_NAMES.PLAYER_SETTINGS,
      JSON.stringify({ ...currentSettings, name }),
    );
  } else {
    setCookie(
      COOKIE_NAMES.PLAYER_SETTINGS,
      JSON.stringify({ ...INITIAL_SETTINGS, name }),
    );
  }
};
export const getPlayerSettings = async () => {
  const settings = await getCookie(COOKIE_NAMES.PLAYER_SETTINGS);

  return settings ? JSON.parse(settings) : null;
};

export const setPlayerSettings = async () => {
  const settings = await getCookie(COOKIE_NAMES.PLAYER_SETTINGS);

  return settings ? JSON.parse(settings) : null;
};
