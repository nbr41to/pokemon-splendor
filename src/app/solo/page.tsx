import { COOKIE_NAMES } from '@/lib/cookie/names';
import { getCookie } from '@/lib/cookie/store';
import { SubscribeState } from './_components/subscribe-state';

export default async function Page() {
  const playerId = await getCookie(COOKIE_NAMES.PLAYER_ID);
  const playerName = await getCookie(COOKIE_NAMES.PLAYER_NAME);
  const spritesType = await getCookie(COOKIE_NAMES.SPRITES_TYPE);
  const gameState = await getCookie(COOKIE_NAMES.SOLO_GAME_STATE); // これがあったら続きから

  const player = {
    id: playerId,
    name: playerName,
    isReady: false,
  } as RoomPlayer;

  return (
    <div className="w-screen pb-52">
      <SubscribeState
        player={player}
        spritesType={spritesType}
        gameState={gameState}
      />
    </div>
  );
}
