import { usePokemons } from '@/lib/state/usePokemons';
import { PokemonSlot } from './PokemonSlot';

export const PokemonsBoard = () => {
  const pokemons = usePokemons((state) => state.pokemons);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {pokemons.ev3.map((pokemon) => (
          <PokemonSlot key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex gap-4">
        {pokemons.ev2.map((pokemon) => (
          <PokemonSlot key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex gap-4">
        {pokemons.ev1.map((pokemon) => (
          <PokemonSlot key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};
