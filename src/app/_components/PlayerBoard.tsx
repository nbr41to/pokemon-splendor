import { Card } from '@/components/ui/card';
import { usePlayer } from '@/lib/state/usePlayer';
import { calcFixedTokens } from '@/utils/calcTokens';
import { cn } from '@/utils/classNames';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

export const PlayerBoard = () => {
  const player = usePlayer((state) => state.player);
  const fixedTokens = useMemo(() => calcFixedTokens(player), [player]);

  return (
    <div>
      <div className="">
        {Object.keys(player.tokens).map((key) => {
          const token = player.tokens[key as TokenKey];

          return (
            <div key={key} className="flex items-center">
              <div>
                <Image src={token.spriteUrl} width={40} height={40} alt={key} />
              </div>
              <div className="font-mono text-xl font-bold">
                {token.quantity}
              </div>
              <div className="ml-4 font-mono text-xl font-bold text-red-600">
                {fixedTokens[key as TokenKey].quantity}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4">
        {player.pokemons.map((pokemon, index) => (
          <Card
            key={index}
            className={cn(
              'h-[192px] w-40',
              pokemon.tokens.token1.quantity > 0 && 'bg-red-100',
              pokemon.tokens.token2.quantity > 0 && 'bg-green-100',
              pokemon.tokens.token3.quantity > 0 && 'bg-yellow-100',
              pokemon.tokens.token4.quantity > 0 && 'bg-blue-100',
            )}
          >
            <div className="flex items-center justify-between px-2">
              <div>
                {pokemon.points > 0 && (
                  <div className="my-1 grid size-5 place-content-center rounded-full border bg-background font-mono text-sm font-bold">
                    {pokemon.points}
                  </div>
                )}
              </div>
              <div className="flex">
                {Object.keys(pokemon.tokens).map((key) => {
                  const token = pokemon.tokens[key as TokenKey];
                  if (token.quantity < 1) return null;

                  return Array.from({ length: token.quantity }).map(
                    (_, key) => (
                      <Image
                        key={key}
                        src={token.spriteUrl}
                        width={28}
                        height={28}
                        alt=""
                      />
                    ),
                  );
                })}
              </div>
            </div>

            <div className="mx-2 rounded bg-background p-1">
              <Image
                className="mx-auto"
                src={pokemon.spriteUrl}
                width={80}
                height={80}
                alt={pokemon.name}
              />
            </div>

            {/* requiredTokens */}

            {/* Evolution */}
            {pokemon.evolution && (
              <div className="m-2 flex items-center justify-between rounded border bg-background p-2">
                <div className="flex items-center">
                  <Image
                    src={
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png'
                    }
                    width={24}
                    height={24}
                    alt=""
                  />
                  <div>
                    <span className="">x</span>
                    <span className="font-bold">4</span>
                  </div>
                </div>
                <ChevronsRight size={20} />
                <Image
                  src={pokemon.evolution.spriteUrl}
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
