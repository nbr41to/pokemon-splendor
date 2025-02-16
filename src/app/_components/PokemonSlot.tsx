import { Card } from '@/components/ui/card';
import { ChevronsUp } from 'lucide-react';
import Image from 'next/image';

type Props = {
  pokemon: Pokemon;
};

export const PokemonSlot = ({ pokemon }: Props) => {
  return (
    <Card key={pokemon.id} className="bg-yellow-50">
      <div className="flex justify-between items-center px-2">
        <div>
          {pokemon.points > 0 && (
            <div className="text-xl font-bold my-2 border rounded-full size-8 grid place-content-center bg-background">
              {pokemon.points}
            </div>
          )}
        </div>
        <div className="flex">
          {Object.keys(pokemon.tokens).map((key) => {
            const token = pokemon.tokens[key as TokenKey];
            if (token.quantity < 1) return null;

            return Array.from({ length: token.quantity }).map((_, key) => (
              <Image
                key={key}
                src={token.spriteUrl}
                width={40}
                height={40}
                alt=""
              />
            ));
          })}
        </div>
      </div>

      <Image
        className="mx-8"
        src={pokemon.spriteUrl}
        width={120}
        height={120}
        alt={pokemon.name}
      />

      <div className="flex justify-between p-2">
        {/* requiredTokens */}
        <div>
          {Object.keys(pokemon.requiredTokens).map((key) => {
            const token = pokemon.requiredTokens[key as TokenKey];
            if (token.quantity < 1) return null;

            return (
              <div key={key} className="flex">
                {Array.from({ length: token.quantity }).map((_, key) => (
                  <Image
                    key={key}
                    src={token.spriteUrl}
                    width={24}
                    height={24}
                    alt=""
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Evolution */}
        {pokemon.evolution && (
          <div className="border rounded p-2 flex flex-col items-center bg-background">
            <Image
              src={pokemon.evolution.spriteUrl}
              width={40}
              height={40}
              alt=""
            />
            <ChevronsUp />
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
          </div>
        )}
      </div>
    </Card>
  );
};
