import { Card } from '@/components/ui/card';
import { cn } from '@/utils/classNames';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

type Props = {
  size?: 'sm' | 'md';
  phase?: Phase;
  pokemon: Pokemon | null;
  disabled: boolean;
  onClick: () => void;
};

export const PokemonCard = ({
  size = 'md',
  phase,
  pokemon,
  onClick,
  disabled,
}: Props) => {
  const sizeClasses = size === 'sm' ? 'h-56 min-w-48' : 'h-[340px] w-60';

  if (!pokemon)
    return (
      <div className="m-0.5 sm:m-1">
        <Card className="h-[144px] min-w-24 max-w-24 sm:h-[230px] sm:min-w-48 sm:max-w-48" />
      </div>
    );

  return (
    <button
      className="m-0.5 sm:m-1"
      type="button"
      disabled={disabled}
      onClick={() => onClick()}
    >
      <Card
        className={cn(
          'relative flex h-[144px] min-w-24 max-w-24 flex-col rounded-md border-2 border-background p-1 pt-3 shadow-md sm:h-[230px] sm:min-w-48 sm:max-w-48 sm:border-4 sm:p-2 sm:pt-6',
          !disabled && 'cursor-pointer transition-transform hover:scale-[1.03]',
          pokemon.fixedTokens.red.quantity > 0 &&
            (disabled ? 'bg-red-100' : 'bg-red-400'),
          pokemon.fixedTokens.green.quantity > 0 &&
            (disabled ? 'bg-green-100' : 'bg-green-400'),
          pokemon.fixedTokens.yellow.quantity > 0 &&
            (disabled ? 'bg-yellow-100' : 'bg-yellow-400'),
          pokemon.fixedTokens.blue.quantity > 0 &&
            (disabled ? 'bg-blue-100' : 'bg-blue-400'),
          pokemon.fixedTokens.black.quantity > 0 &&
            (disabled ? 'bg-gray-200' : 'bg-gray-400'),
        )}
      >
        {pokemon.points > 0 && (
          <div className="absolute left-0 top-0 z-10 grid size-6 place-content-center rounded-full border bg-background font-sans font-bold text-blue-700 sm:left-1 sm:top-1 sm:size-8 sm:text-xl">
            {pokemon.points}
          </div>
        )}
        <div className="absolute right-2 top-0 z-10 flex w-full items-center justify-end sm:right-3">
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
          <div
            className={cn(
              'grid place-content-center rounded-sm bg-background p-1 sm:rounded',
              disabled && 'grayscale',
            )}
          >
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
        <div className="z-10 -mx-2 -mt-2 flex sm:-mx-1 sm:mt-0 sm:gap-1 sm:py-1">
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
          <div className="-m-1 hidden whitespace-pre text-xs font-bold text-neutral-600 sm:block">
            {pokemon.name}
          </div>

          {/* Evolution */}
          {pokemon.evolveCondition && (
            <div className="flex h-full w-full items-center justify-between gap-x-1 rounded border bg-background px-0.5 py-1 sm:w-[104px]">
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
                src={pokemon.evolveCondition.spriteUrl}
                width={32}
                height={32}
                alt=""
              />
            </div>
          )}
        </div>
      </Card>
    </button>
  );
};
