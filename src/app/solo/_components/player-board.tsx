import { Button } from '@/components/ui/button';
import { useEvolve } from '@/lib/state/useEvolve';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { calcEvolvable } from '@/utils/calcAble';
import { calcScore } from '@/utils/calcScore';
import { calcFixedTokens } from '@/utils/calcTokens';
import { cancelEvolve } from '@/utils/state';
import { Bookmark, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { GetTokenFormDialog } from './get-token-form-dialog';
import { PokemonCardCarrying } from './pokemon-card-carrying';
import { ReservationSheet } from './reservation-sheet';

export const PlayerBoard = () => {
  const [openGetTokenForm, setOpenGetTokenForm] = useState(false);

  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);

  const player = useMe((state) => state.player);

  const isReserving = useMe((state) => state.isReserving);
  const setIsReserving = useMe((state) => state.setIsReserving);

  const evolve = useEvolve((state) => state.evolve);
  const setEvolve = useEvolve((state) => state.setEvolve);

  const fixedTokens = useMemo(() => calcFixedTokens(player), [player]);

  const handleOnCancelEvolve = () => {
    const newState = cancelEvolve(state);
    setState(newState);
  };

  return (
    <>
      <div className="bg-background p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 sm:rounded">
          <div className="flex items-center">
            <Trophy size={24} className="m-2 stroke-blue-700" />
            <span className="font-mono text-xl font-bold text-blue-700">
              {calcScore(player.pokemons)}
            </span>
          </div>
          <ReservationSheet />
        </div>

        <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2 sm:gap-x-4 sm:space-x-0 sm:space-y-0">
          <GetTokenFormDialog
            disabled={state.currentPhase !== 'action'}
            open={openGetTokenForm}
            setOpen={setOpenGetTokenForm}
          />
          <Button
            size="lg"
            variant={isReserving ? 'destructive' : 'outline'}
            className="w-44 rounded-full"
            disabled={
              state.currentPhase !== 'action' || player.reservations.length > 2
            }
            onClick={() => setIsReserving(!isReserving)}
          >
            <Bookmark />
            {isReserving ? '予約をやめる' : '予約をする'}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 bg-background p-5 sm:gap-4 sm:rounded">
        {Object.keys(player.tokens).map((key) => {
          const token = player.tokens[key as TokenType];

          return (
            <div
              key={key}
              className="flex w-24 items-center justify-around rounded border py-1 pr-2 font-mono font-bold sm:w-28 sm:text-xl"
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
              <div className="">{token.quantity}</div>
              <div className="pl-2 text-red-600">
                {fixedTokens[key as TokenType].quantity}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 py-2 sm:justify-start">
        {player.pokemons.map((pokemon) => (
          <PokemonCardCarrying
            key={pokemon.uid}
            pokemon={pokemon}
            selected={evolve?.evolveFromUid === pokemon.uid}
            disabled={
              state.currentPhase !== 'evolve' ||
              !calcEvolvable(pokemon, player, state.board)
            }
            onClick={() => {
              if (!pokemon.evolveCondition) return;
              setEvolve({
                ...pokemon.evolveCondition,
                evolveFromUid: pokemon.uid,
                evolveFrom: pokemon.id,
              });
            }}
          />
        ))}
      </div>

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
    </>
  );
};
