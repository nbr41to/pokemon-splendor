import { Button } from '@/components/ui/button';
import TOKEN from '@/constants/token.json';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { updateGameState } from '@/lib/supabase/actions';
import { cn } from '@/utils/classNames';
import { cancelEvolve, getTokens, turnEnd } from '@/utils/state';
import { Bookmark, Store, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { CurrentTokensHeader } from './current-tokens-header';
import { GotPokemons } from './got-pokemons';
import { ReservationSheet } from './reservation-sheet';

export const PlayerBoard = () => {
  const params = useParams<{ id: string | undefined }>();
  const [isGettingToken, setIsGettingToken] = useState(false);

  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);

  const player = useMe((state) => state.player);
  const setMe = useMe((state) => state.setMe);

  const isReserving = useMe((state) => state.isReserving);
  const setIsReserving = useMe((state) => state.setIsReserving);

  const handleOnCancelEvolve = () => {
    const newState = cancelEvolve(state);
    setState(newState);
  };

  const [selectedTokenTypes, setSelectedTokens] = useState<TokenType[]>([]);
  const selectToken = (key: TokenType) => {
    if (selectedTokenTypes.length > 2) return;
    if (
      selectedTokenTypes.length === 2 &&
      selectedTokenTypes[0] === selectedTokenTypes[1]
    )
      return;

    setSelectedTokens((prev) => [...prev, key]);
  };

  const handleGetToken = () => {
    const newState = getTokens(state, selectedTokenTypes);

    setState(newState);
    setMe(newState.players[0]);

    setSelectedTokens([]);
    setIsGettingToken(false);
  };

  const doTurnEnd = () => {
    const updatedState = turnEnd(state);
    // オンラインではプレイヤーの順番を変える処理が必要
    setState(updatedState);

    if (params.id) {
      updateGameState(state.id, updatedState);
    }
  };

  return (
    <>
      <CurrentTokensHeader />

      <div className="mx-auto w-fit space-y-5 rounded-lg bg-background p-2 sm:p-5">
        {state.currentPhase === 'action' && (
          <div className="flex flex-wrap items-center justify-between space-x-2 sm:space-x-4">
            <Button
              size="lg"
              variant={isReserving ? 'destructive' : 'outline'}
              className="w-44 rounded-full"
              disabled={
                state.currentPhase !== 'action' ||
                player.reservations.length > 2
              }
              onClick={() => setIsReserving(!isReserving)}
            >
              <Bookmark />
              {isReserving ? '予約をやめる' : '予約をする'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              disabled={state.currentPhase !== 'action'}
              onClick={() => setIsGettingToken(!isGettingToken)}
            >
              <Store />
              道具をもらう
            </Button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-1 bg-background sm:rounded">
          {(Object.keys(player.tokens) as TokenType[]).map((key) => {
            if (key === 'gold') return null;

            const token = state.tokens[key];

            return (
              <Button
                key={key}
                variant={!isGettingToken ? 'link' : 'outline'}
                disabled={
                  !isGettingToken ||
                  token.quantity < 1 ||
                  selectedTokenTypes.length > 2 ||
                  (selectedTokenTypes.length === 2 &&
                    selectedTokenTypes.includes(key)) ||
                  (selectedTokenTypes.length === 2 &&
                    selectedTokenTypes[0] === selectedTokenTypes[1])
                }
                className={cn(
                  'w-18 h-10 gap-px rounded-full px-2 text-xl sm:h-12',
                  !isGettingToken &&
                    'border border-transparent disabled:opacity-100',
                )}
                onClick={() => selectToken(key)}
                // className="flex w-24 items-center justify-around rounded border py-1 pr-2 font-mono font-bold sm:w-28 sm:text-xl"
              >
                <Image
                  className="block sm:hidden"
                  src={token.spriteUrl}
                  width={32}
                  height={32}
                  alt={key}
                />
                <Image
                  className="hidden sm:block"
                  src={token.spriteUrl}
                  width={40}
                  height={40}
                  alt={key}
                />
                <div className="font-mono font-bold">{token.quantity}</div>
              </Button>
            );
          })}
        </div>
        {isGettingToken && (
          <div className="flex gap-4">
            <div className="flex h-[58px] grow rounded border p-2">
              {selectedTokenTypes.map((key, index) => {
                const { SPRITE_URL } =
                  TOKEN[key.toUpperCase() as keyof typeof TOKEN];

                return (
                  <Image
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    className="flex items-center"
                    src={SPRITE_URL}
                    width={40}
                    height={40}
                    alt={key}
                  />
                );
              })}

              <Button
                variant="ghost"
                className="relative ml-auto size-10 w-fit p-2 [&_svg]:size-8"
                disabled={selectedTokenTypes.length === 0}
                onClick={() => setSelectedTokens([])}
              >
                <X className="fill-neutral-500" />
              </Button>
            </div>

            <Button
              className="h-[58px] w-24 text-base"
              disabled={
                selectedTokenTypes.length < 3 &&
                !(
                  selectedTokenTypes.length === 2 &&
                  selectedTokenTypes[0] === selectedTokenTypes[1]
                )
              }
              onClick={handleGetToken}
            >
              決 定
            </Button>
          </div>
        )}
      </div>

      <GotPokemons />

      <div className="fixed bottom-5 right-5 z-30">
        <ReservationSheet />
      </div>

      {/* cancel evolve */}
      {state.currentPhase === 'evolve' && (
        <div className="fixed bottom-0 left-0 z-10 w-full bg-background p-5">
          <div className="mx-auto w-fit">
            <Button
              variant="destructive"
              className="rounded-full"
              disabled={state.currentPhase !== 'evolve'}
              onClick={handleOnCancelEvolve}
            >
              進化しない
            </Button>
          </div>
        </div>
      )}

      {/* Turn end */}
      {state.currentPhase === 'waiting-end' && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-background/50"
          onClick={doTurnEnd}
          onKeyDown={doTurnEnd}
        >
          <Button className="rounded-full" size="lg">
            End
          </Button>
        </div>
      )}
    </>
  );
};
