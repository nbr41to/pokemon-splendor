'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import pokemonsData from '@/constants/generated/pokemons.json';
import { useState } from 'react';
import { PokemonDetailDialog } from './PokemonDetailDialog';

const replaceKana = (str: string) => {
  return str
    .replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;

      return String.fromCharCode(chr);
    })
    .replace(/[\u30f7-\u30fc]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
};

export const SearchPokemon = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonResults, setPokemonResults] =
    useState<typeof pokemonsData>(pokemonsData);

  const searchPokemon = () => {
    if (pokemonName.length === 0) {
      setPokemonResults(pokemonsData);
      return;
    }
    const pokemonResults = pokemonsData.filter((pokemon) => {
      const kanaQuery = replaceKana(pokemonName);

      if (typeof pokemon.name.ja === 'string') {
        const kanaName = replaceKana(pokemon.name.ja);

        return kanaName.includes(kanaQuery);
      }
    });
    setPokemonResults(pokemonResults);
  };

  return (
    <div className="space-y-4 bg-background p-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          searchPokemon();
        }}
      >
        <Input
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Search pokemon"
        />
        <Button disabled={pokemonName.length === 1} type="submit">
          Search
        </Button>
      </form>
      <div className="grid grid-cols-3 border-l border-t">
        {pokemonResults.map((pokemon) => {
          return <PokemonDetailDialog key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
};
