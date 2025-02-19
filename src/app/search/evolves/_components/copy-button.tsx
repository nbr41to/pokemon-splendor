'use client';

import { Button } from '@/components/ui/button';
import type pokemonsData from '@/constants/generated/pokemons.json';
import { useStagedPokemons } from '@/lib/state/useStagedPokemons';
import { PlusCircle } from 'lucide-react';

type Props = {
  pokemon: (typeof pokemonsData)[number];
};

export const CopyButton = ({ pokemon }: Props) => {
  const pokemonIds = useStagedPokemons((state) => state.pokemonIds);
  const addPokemon = useStagedPokemons((state) => state.addPokemon);

  return (
    <Button
      variant="link"
      size="icon"
      className="ml-auto"
      disabled={pokemonIds.includes(pokemon.id)}
      onClick={() => addPokemon(pokemon.id)}
    >
      <PlusCircle />
    </Button>
  );
};
