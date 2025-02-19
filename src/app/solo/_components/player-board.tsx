import { Button } from '@/components/ui/button';
import { useEvolve } from '@/lib/state/useEvolve';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { calcEvolvable } from '@/utils/calcAble';
import { calcScore } from '@/utils/calcScore';
import { calcFixedTokens } from '@/utils/calcTokens';
import { Bookmark, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { GetTokenFormDialog } from './get-token-form-dialog';
import { PokemonCardCarrying } from './pokemon-card-carrying';
import { ReservationSheet } from './reservation-sheet';

export const PlayerBoard = () => {
  const [openGetTokenForm, setOpenGetTokenForm] = useState(false);
  const { board, currentPhase } = useGameState((state) => state.state);
  const player = useMe((state) => state.player);
  const isReserving = useMe((state) => state.isReserving);
  const setIsReserving = useMe((state) => state.setIsReserving);
  const setEvolve = useEvolve((state) => state.setEvolve);
  const fixedTokens = useMemo(() => calcFixedTokens(player), [player]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-background p-5 sm:gap-4 sm:rounded">
        <div className="flex items-center">
          <Trophy size={24} className="m-2 stroke-blue-700" />
          <span className="font-mono text-xl font-bold text-blue-700">
            {calcScore(player.pokemons)}
          </span>
        </div>
        <div className="space-x-2 sm:space-x-4">
          <GetTokenFormDialog
            open={openGetTokenForm}
            setOpen={setOpenGetTokenForm}
          />
          <Button
            size="lg"
            variant={isReserving ? 'destructive' : 'outline'}
            className="w-44 rounded-full"
            onClick={() => setIsReserving(!isReserving)}
          >
            <Bookmark />
            {isReserving ? '予約をやめる' : '予約をする'}
          </Button>
          <ReservationSheet />
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
        {player.pokemons.map((pokemon, index) => (
          <PokemonCardCarrying
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            pokemon={pokemon}
            disabled={
              currentPhase !== 'evolve' ||
              !calcEvolvable(pokemon, player, board)
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
    </>
  );
};
