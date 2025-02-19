import { Card } from '@/components/ui/card';
import { cn } from '@/utils/classNames';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';

type Props = {
  pokemon: Pokemon;
  disabled: boolean;
  onClick: () => void;
};

export const PokemonCardCarrying = ({ pokemon, disabled, onClick }: Props) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      <Card
        className={cn(
          'relative flex h-[172px] min-w-36 max-w-36 flex-col items-center rounded border-2 border-background p-2 pt-4',
          !disabled && 'cursor-pointer hover:scale-105',
          pokemon.fixedTokens.red.quantity > 0 &&
            (!disabled ? 'bg-red-400 ring-4 ring-red-500' : 'bg-red-100'),
          pokemon.fixedTokens.green.quantity > 0 &&
            (!disabled ? 'bg-green-400 ring-4 ring-green-500' : 'bg-green-100'),
          pokemon.fixedTokens.yellow.quantity > 0 &&
            (!disabled
              ? 'bg-yellow-400 ring-4 ring-yellow-500'
              : 'bg-yellow-100'),
          pokemon.fixedTokens.blue.quantity > 0 &&
            (!disabled ? 'bg-blue-400 ring-4 ring-blue-500' : 'bg-blue-100'),
          !disabled && 'cursor-pointer',
          pokemon.fixedTokens.black.quantity > 0 &&
            (!disabled ? 'bg-gray-400 ring-4 ring-gray-600' : 'bg-gray-200'),
        )}
      >
        {pokemon.points > 0 && (
          <div className="absolute left-1 top-1 grid size-8 place-content-center rounded-full border bg-background font-mono text-xl font-bold text-blue-700">
            {pokemon.points}
          </div>
        )}
        <div className="absolute right-2 top-1 flex w-full items-center justify-end">
          {Object.values(pokemon.fixedTokens).map((value) => {
            if (value.quantity < 1) return null;

            return Array.from({ length: value.quantity }).map((_, index) => (
              <Image
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                src={value.spriteUrl}
                width={32}
                height={32}
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
        {pokemon.evolveCondition && (
          <div className="mt-2 flex w-full grow items-center justify-between gap-x-1 rounded border bg-background pl-1">
            <div className="flex items-end">
              <Image
                src={pokemon.evolveCondition.requiredToken.spriteUrl}
                width={32}
                height={32}
                alt=""
              />
              <div className="text-red-600">
                <span className="text-sm">x</span>
                <span className="font-bold">
                  {pokemon.evolveCondition.requiredToken.quantity}
                </span>
              </div>
            </div>
            <ChevronsRight size={16} />
            <Image
              src={pokemon.evolveCondition.spriteUrl}
              width={48}
              height={48}
              alt=""
            />
          </div>
        )}
      </Card>
    </button>
  );
};
