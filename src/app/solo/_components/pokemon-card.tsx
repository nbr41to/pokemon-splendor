import { Card } from '@/components/ui/card';
import { cn } from '@/utils/classNames';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';

type Props = {
  size?: 'sm' | 'md';
  phase?: Phase;
  pokemon: Pokemon | null;
  onClick: () => void;
  getable?: boolean;
  evolvable: boolean;
};

export const PokemonCard = ({
  size = 'md',
  phase,
  pokemon,
  onClick,
  getable = false,
  evolvable,
}: Props) => {
  const sizeClasses = size === 'sm' ? 'h-56 min-w-48' : 'h-[340px] w-60';

  if (!pokemon) return <Card className="h-56 w-48" />;

  return (
    <Card key={pokemon.id} className="m-1 shadow-md">
      <button
        type="button"
        className={cn(
          'relative m-1 flex h-56 min-w-48 max-w-48 flex-col items-center rounded pt-6',
          (getable || evolvable) && 'cursor-pointer hover:scale-105',
          pokemon.fixedTokens.red.quantity > 0 &&
            (getable || evolvable
              ? 'bg-red-300 ring-2 ring-red-400'
              : 'bg-red-50'),
          pokemon.fixedTokens.green.quantity > 0 &&
            (getable || evolvable
              ? 'bg-green-300 ring-2 ring-green-400'
              : 'bg-green-50'),
          pokemon.fixedTokens.yellow.quantity > 0 &&
            (getable || evolvable
              ? 'bg-yellow-300 ring-2 ring-yellow-400'
              : 'bg-yellow-50'),
          pokemon.fixedTokens.blue.quantity > 0 &&
            (getable || evolvable
              ? 'bg-blue-300 ring-2 ring-blue-400'
              : 'bg-blue-50'),
          pokemon.fixedTokens.black.quantity > 0 &&
            (getable || evolvable
              ? 'bg-gray-500 ring-2 ring-gray-700'
              : 'bg-gray-300'),
        )}
        disabled={!getable && !evolvable}
        onClick={() => onClick()}
      >
        {pokemon.points > 0 && (
          <div className="absolute left-1 top-1 grid size-8 place-content-center rounded-full border bg-background font-sans text-xl font-bold text-blue-700">
            {pokemon.points}
          </div>
        )}
        <div className="absolute right-1 top-0 flex w-full items-center justify-end px-2">
          {Object.values(pokemon.fixedTokens).map((token) => {
            const { quantity, spriteUrl } = token;
            if (quantity < 1) return null;

            return Array.from({ length: quantity }).map((_, index) => (
              <Image
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                src={spriteUrl}
                width={36}
                height={36}
                alt=""
              />
            ));
          })}
        </div>

        <div className="w-full">
          <div className="mx-2 grid place-content-center rounded bg-background p-1">
            <Image
              className="bg-background p-1"
              src={pokemon.spriteUrl}
              width={100}
              height={100}
              alt={pokemon.name}
            />
          </div>
        </div>

        {/* requiredTokens */}
        <div className="flex w-full flex-wrap gap-1 p-1">
          {Object.keys(pokemon.requiredTokens).map((key) => {
            const token = pokemon.requiredTokens[key as TokenType];
            if (token.quantity < 1) return null;

            return (
              <div key={key} className="flex items-center">
                <Image
                  key={key}
                  src={token.spriteUrl}
                  width={28}
                  height={28}
                  alt=""
                />
                <span className="font-mono font-bold">{token.quantity}</span>
              </div>
            );
          })}
        </div>

        <div className="flex w-full grow items-end justify-between px-2 pb-2">
          <div className="text-xs font-bold text-neutral-600">
            {pokemon.name}
          </div>
          {/* Evolution */}
          {pokemon.evolveCondition && (
            <div className="flex h-full items-center justify-between gap-x-1 rounded border bg-background px-1">
              <div className="flex items-center">
                <Image
                  src={pokemon.evolveCondition.requiredToken.spriteUrl}
                  width={28}
                  height={28}
                  alt=""
                />
                <div className="text-red-600">
                  <span className="text-xs">x</span>
                  <span className="text-sm font-bold">
                    {pokemon.evolveCondition.requiredToken.quantity}
                  </span>
                </div>
              </div>
              <ChevronsRight size={16} />
              <Image
                src={pokemon.evolveCondition.spriteUrl}
                width={36}
                height={36}
                alt=""
              />
            </div>
          )}
        </div>
      </button>
    </Card>
  );
};
