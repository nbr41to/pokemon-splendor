import { Card } from '@/components/ui/card';
import { usePlayer } from '@/lib/state/usePlayer';
import { calcFixedTokens, calcTotalTokens } from '@/utils/calcTokens';
import { cn } from '@/utils/classNames';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

type Props = {
  phase: Phase;
  pokemon: Pokemon | null;
};

export const PlayerPokemon = ({ phase, pokemon }: Props) => {
  const addPokemon = usePlayer((state) => state.addPokemon);
  const player = usePlayer((state) => state.player);
  const setTokens = usePlayer((state) => state.setTokens);
  const fixedTokens = useMemo(() => calcFixedTokens(player), [player]);
  const totalTokens = useMemo(() => calcTotalTokens(player), [player]);
  const getable = useMemo(() => {
    if (phase === 'evolve' || !pokemon) return false;

    return Object.keys(pokemon.requiredTokens).every((key) => {
      const token = pokemon.requiredTokens[key as TokenKey];
      return totalTokens[key as TokenKey].quantity >= token.quantity;
    });
  }, [phase, pokemon, totalTokens]);

  const handleOnClick = (pokemon: Pokemon) => {
    const updatedTokens = { ...player.tokens };
    const requiredTokens = { ...pokemon.requiredTokens };
    for (const key of Object.keys(requiredTokens)) {
      const requiredToken = requiredTokens[key as TokenKey];
      requiredToken.quantity =
        requiredToken.quantity - fixedTokens[key as TokenKey].quantity;
      if (requiredToken.quantity > 0) {
        updatedTokens[key as TokenKey].quantity =
          updatedTokens[key as TokenKey].quantity - requiredToken.quantity;
      }
    }

    addPokemon(pokemon);
    setTokens(updatedTokens);
  };

  if (!pokemon) return <Card className="h-[340px] w-60" />;

  return (
    <Card key={pokemon.id}>
      <button
        type="button"
        className={cn(
          'relative flex h-[180px] min-w-36 max-w-36 flex-col items-center rounded-md p-2 pt-4',
          pokemon.tokens.token1.quantity > 0 &&
            (getable ? 'bg-red-200 ring-red-500 hover:ring-2' : 'bg-red-50'),
          pokemon.tokens.token2.quantity > 0 &&
            (getable
              ? 'bg-green-200 ring-green-500 hover:ring-2'
              : 'bg-green-50'),
          pokemon.tokens.token3.quantity > 0 &&
            (getable
              ? 'bg-yellow-200 ring-yellow-500 hover:ring-2'
              : 'bg-yellow-50'),
          pokemon.tokens.token4.quantity > 0 &&
            (getable ? 'bg-blue-200 ring-blue-500 hover:ring-2' : 'bg-blue-50'),
          getable && 'cursor-pointer',
          pokemon.tokens.token5.quantity > 0 &&
            (getable
              ? 'bg-gray-300 ring-gray-500 hover:ring-2'
              : 'bg-gray-100'),
        )}
        disabled={!getable}
        onClick={() => handleOnClick(pokemon)}
      >
        {pokemon.points > 0 && (
          <div className="absolute left-1 top-1 grid size-8 place-content-center rounded-full border bg-background font-mono text-xl font-bold text-blue-700">
            {pokemon.points}
          </div>
        )}
        <div className="absolute right-2 top-1 flex w-full items-center justify-end">
          {Object.keys(pokemon.tokens).map((key) => {
            const token = pokemon.tokens[key as TokenKey];
            if (token.quantity < 1) return null;

            return Array.from({ length: token.quantity }).map((_, index) => (
              <Image
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                src={token.spriteUrl}
                width={28}
                height={28}
                alt=""
              />
            ));
          })}
        </div>

        <div className="w-full">
          <div className="grid place-content-center rounded bg-background p-1">
            <Image
              className="bg-background p-1"
              src={pokemon.spriteUrl}
              width={80}
              height={80}
              alt={pokemon.name}
            />
          </div>
        </div>

        {/* Evolution */}
        {pokemon.evolution && (
          <div className="mt-2 flex w-full grow items-center justify-between gap-x-1 rounded border bg-background pl-1">
            <div className="flex items-center">
              <Image
                src={pokemon.evolution.requiredToken.spriteUrl}
                width={28}
                height={28}
                alt=""
              />
              <div className="text-red-600">
                <span className="text-sm">x</span>
                <span className="font-bold">
                  {pokemon.evolution.requiredToken.quantity}
                </span>
              </div>
            </div>
            <ChevronsRight size={16} />
            <Image
              src={pokemon.evolution.spriteUrl}
              width={48}
              height={48}
              alt=""
            />
          </div>
        )}
      </button>
    </Card>
  );
};
