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
import { Bookmark, Copy, X } from 'lucide-react';
import Image from 'next/image';

export const StagedPokemonSheet = () => {
  const pokemonIds = useStagedPokemons((state) => state.pokemonIds);
  const removePokemon = useStagedPokemons((state) => state.removePokemon);
  const clearPokemons = useStagedPokemons((state) => state.clearPokemons);
  const copyIds = () => {
    navigator.clipboard.writeText(JSON.stringify(pokemonIds));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <div className="h-full overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Staged Pokemons</SheetTitle>
            <SheetDescription>{/*  */}</SheetDescription>
          </SheetHeader>

          <div className="flex justify-between">
            <Button onClick={copyIds}>
              <Copy />
              Copy IDs
            </Button>
            <Button variant="destructive" onClick={clearPokemons}>
              <X />
              Clear
            </Button>
          </div>
          <div className="mx-auto w-60 py-5">
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
