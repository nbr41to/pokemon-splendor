import evolvesData from '@/constants/generated/evolves.json';
import pokemonsData from '@/constants/generated/pokemons.json';
import { ChevronsRight } from 'lucide-react';
import { PokemonCell } from './pokemon-cell';

export const EvolveList = () => {
  return (
    <div className="mx-auto w-fit divide-y">
      {evolvesData.map((evolve) => {
        const pokemon = pokemonsData.find((p) => p.id === evolve.base);
        if (!pokemon) return null;

        return (
          <div key={pokemon.id} className="flex items-center gap-x-4">
            <PokemonCell pokemon={pokemon} />

            {evolve.evolves.ev2 && (
              <>
                <ChevronsRight className="mx-2" />
                <div className="min-w-40">
                  {evolve.evolves.ev2.map((evolveTo) => {
                    const pokemon = pokemonsData.find((p) => p.id === evolveTo);
                    if (!pokemon) return null;

                    return <PokemonCell key={pokemon.id} pokemon={pokemon} />;
                  })}
                </div>
              </>
            )}
            {evolve.evolves.ev3 && (
              <>
                <ChevronsRight className="mx-2" />
                <div className="min-w-40">
                  {evolve.evolves.ev3.map((evolveTo) => {
                    const pokemon = pokemonsData.find((p) => p.id === evolveTo);
                    if (!pokemon) return null;

                    return <PokemonCell key={pokemon.id} pokemon={pokemon} />;
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
