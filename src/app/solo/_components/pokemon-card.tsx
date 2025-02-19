import { Card } from '@/components/ui/card';
import { cn } from '@/utils/classNames';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

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

  if (!pokemon)
    return (
      <Card className="m-1 shadow-md">
        <div className="m-1 h-[140px] min-w-24 max-w-24 sm:h-56 sm:min-w-48 sm:max-w-48" />
      </Card>
    );

  return (
    <Card key={pokemon.id} className="m-1 shadow-md">
      <button
        type="button"
        className={cn(
          'relative m-0.5 flex h-[140px] min-w-24 max-w-24 flex-col rounded-md p-1 pt-3 sm:m-1 sm:h-[222px] sm:min-w-48 sm:max-w-48 sm:p-2 sm:pt-6',
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
          <div className="absolute left-0 top-0 grid size-6 place-content-center rounded-full border bg-background font-sans font-bold text-blue-700 sm:left-1 sm:top-1 sm:size-8 sm:text-xl">
            {pokemon.points}
          </div>
        )}
        <div className="absolute right-2 top-0 flex w-full items-center justify-end sm:right-3">
          {Object.values(pokemon.fixedTokens).map((token) => {
            const { quantity, spriteUrl } = token;
            if (quantity < 1) return null;

            return Array.from({ length: quantity }).map((_, index) => (
              <Fragment
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
              >
                <Image
                  className="block sm:hidden"
                  src={spriteUrl}
                  width={22}
                  height={22}
                  alt=""
                />
                <Image
                  className="hidden sm:block"
                  src={spriteUrl}
                  width={36}
                  height={36}
                  alt=""
                />
              </Fragment>
            ));
          })}
        </div>

        <div className="w-full">
          <div className="grid place-content-center rounded-sm bg-background p-1 sm:rounded">
            <Image
              className="block sm:hidden"
              src={pokemon.spriteUrl}
              width={64}
              height={64}
              alt={pokemon.name}
            />
            <Image
              className="hidden sm:block"
              src={pokemon.spriteUrl}
              width={100}
              height={100}
              alt={pokemon.name}
            />
          </div>
        </div>

        {/* requiredTokens */}
        <div className="-mx-2 -mt-2 flex sm:-mx-1 sm:mt-0 sm:gap-1 sm:py-1">
          {Object.keys(pokemon.requiredTokens).map((key) => {
            const token = pokemon.requiredTokens[key as TokenType];
            if (token.quantity < 1) return null;

            return (
              <div key={key} className="flex items-center">
                <Image
                  className="block sm:hidden"
                  src={token.spriteUrl}
                  width={18}
                  height={18}
                  alt=""
                />
                <Image
                  className="hidden sm:block"
                  src={token.spriteUrl}
                  width={28}
                  height={28}
                  alt=""
                />
                <span className="-ml-0.5 font-mono text-[10px] font-bold sm:ml-0 sm:text-base">
                  {token.quantity}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex w-full grow items-end sm:justify-between">
          <div className="hidden text-xs font-bold text-neutral-600 sm:block">
            {pokemon.name}
          </div>

          {/* Evolution */}
          {pokemon.evolveCondition && (
            <div className="flex h-full w-full items-center justify-between gap-x-1 rounded border bg-background px-0.5 py-1 sm:w-28">
              <div className="flex items-center">
                <Image
                  className="block sm:hidden"
                  src={pokemon.evolveCondition.requiredToken.spriteUrl}
                  width={24}
                  height={24}
                  alt=""
                />
                <Image
                  className="hidden sm:block"
                  src={pokemon.evolveCondition.requiredToken.spriteUrl}
                  width={28}
                  height={28}
                  alt=""
                />
                <div className="-ml-0.5 font-mono text-red-600 sm:ml-0 sm:flex sm:items-end">
                  <span className="mt-2 hidden text-xs/[1] sm:block">x</span>
                  <span className="text-xs/[1] font-bold sm:text-sm/[1]">
                    {pokemon.evolveCondition.requiredToken.quantity}
                  </span>
                </div>
              </div>
              <ChevronsRight size={14} />
              <Image
                className="block sm:hidden"
                src={pokemon.evolveCondition.spriteUrl}
                width={32}
                height={32}
                alt=""
              />
              <Image
                className="hidden sm:block"
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
