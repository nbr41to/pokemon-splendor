import { Card } from '@/components/ui/card';
import { usePlayer } from '@/lib/state/usePlayer';
import { cn } from '@/utils/classNames';
import { ChevronsUp } from 'lucide-react';
import Image from 'next/image';

type Props = {
  pokemon: Pokemon | null;
  removePokemon: () => void;
};

export const PokemonSlot = ({ pokemon, removePokemon }: Props) => {
  const addPokemon = usePlayer((state) => state.addPokemon);
  const handleOnClick = (pokemon: Pokemon) => {
    removePokemon();
    addPokemon(pokemon);
  };

  if (!pokemon) return <Card className="h-[340px] w-60" />;

  return (
    <Card
      key={pokemon.id}
      className={cn(
        'flex h-[340px] w-60 flex-col',
        pokemon.tokens.token1.quantity > 0 && 'bg-red-100',
        pokemon.tokens.token2.quantity > 0 && 'bg-green-100',
        pokemon.tokens.token3.quantity > 0 && 'bg-yellow-100',
        pokemon.tokens.token4.quantity > 0 && 'bg-blue-100',
      )}
      onClick={() => handleOnClick(pokemon)}
    >
      <div className="flex items-center justify-between px-2">
        <div>
          {pokemon.points > 0 && (
            <div className="my-1 grid size-8 place-content-center rounded-full border bg-background font-mono text-xl font-bold">
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

      <div className="mx-2 rounded bg-background p-1">
        <Image
          className="mx-auto"
          src={pokemon.spriteUrl}
          width={160}
          height={160}
          alt={pokemon.name}
        />
      </div>

      <div className="flex grow items-start justify-between p-2">
        {/* requiredTokens */}
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-wrap gap-1">
            {Object.keys(pokemon.requiredTokens).map((key) => {
              const token = pokemon.requiredTokens[key as TokenKey];
              if (token.quantity < 1) return null;

              return (
                <div key={key} className="flex items-center">
                  <Image
                    key={key}
                    src={token.spriteUrl}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span className="font-mono font-bold">{token.quantity}</span>
                </div>
              );
            })}
          </div>
          <div className="font-bold">{pokemon.name}</div>
        </div>

        {/* Evolution */}
        {pokemon.evolution && (
          <div className="flex h-full flex-col items-center justify-between rounded border bg-background p-2">
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
