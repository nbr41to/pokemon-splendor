'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import pokemonsData from '@/constants/generated/pokemons.json';
import { useStagedPokemons } from '@/lib/state/useStagedPokemons';
import Image from 'next/image';

export const StagedPokemonSheet = () => {
  const pokemonIds = useStagedPokemons((state) => state.pokemonIds);
  const removePokemon = useStagedPokemons((state) => state.removePokemon);
  const copyIds = () => {
    navigator.clipboard.writeText(JSON.stringify(pokemonIds));
  };

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <div className="h-full overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Staged Pokemons</SheetTitle>
            <SheetDescription>{/*  */}</SheetDescription>
          </SheetHeader>

          <Button size="sm" onClick={copyIds}>
            Copy IDs
          </Button>
          <div className="mx-auto w-60">
            {pokemonIds.map((id) => {
              const pokemon = pokemonsData.find((p) => p.id === id);
              if (!pokemon) return null;

              return (
                <button
                  key={pokemon.id}
                  type="button"
                  className=""
                  onClick={() => removePokemon(pokemon.id)}
                >
                  <Image
                    src={pokemon.sprites.default}
                    width={80}
                    height={80}
                    alt=""
                  />
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
