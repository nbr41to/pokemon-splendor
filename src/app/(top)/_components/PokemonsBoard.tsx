import {
  useEv1PokemonSlots,
  useEv2PokemonSlots,
  useEv3PokemonSlots,
} from '@/lib/state/usePokemons';
import { useEffect } from 'react';
import { PokemonSlot } from './PokemonSlot';

type Props = {
  phase: Phase;
};
export const PokemonsBoard = ({ phase }: Props) => {
  const ev1Pokemons = useEv1PokemonSlots((state) => state.slots);
  const ev2Pokemons = useEv2PokemonSlots((state) => state.slots);
  const ev3Pokemons = useEv3PokemonSlots((state) => state.slots);
  const provideEv1Pokemon = useEv1PokemonSlots((state) => state.providePokemon);
  const provideEv2Pokemon = useEv2PokemonSlots((state) => state.providePokemon);
  const provideEv3Pokemon = useEv3PokemonSlots((state) => state.providePokemon);
  const removeEv1Pokemon = useEv1PokemonSlots((state) => state.removePokemon);
  const removeEv2Pokemon = useEv2PokemonSlots((state) => state.removePokemon);
  const removeEv3Pokemon = useEv3PokemonSlots((state) => state.removePokemon);

  const handleRemoveEv1Pokemon = (index: number) => {
    removeEv1Pokemon(index);
    provideEv1Pokemon();
  };
  const handleRemoveEv2Pokemon = (index: number) => {
    removeEv2Pokemon(index);
    provideEv2Pokemon();
  };
  const handleRemoveEv3Pokemon = (index: number) => {
    removeEv3Pokemon(index);
    provideEv3Pokemon();
  };

  return (
    <div className="">
      <div className="flex gap-3 overflow-x-scroll p-1">
        {ev3Pokemons.map((pokemon, index) => (
          <PokemonSlot
            key={index}
            phase={phase}
            pokemon={pokemon}
            removePokemon={() => handleRemoveEv3Pokemon(index)}
          />
        ))}
      </div>
      <div className="flex gap-3 overflow-x-scroll p-1">
        {ev2Pokemons.map((pokemon, index) => (
          <PokemonSlot
            key={index}
            phase={phase}
            pokemon={pokemon}
            removePokemon={() => handleRemoveEv2Pokemon(index)}
          />
        ))}
      </div>
      <div className="flex gap-3 overflow-x-scroll p-1">
        {ev1Pokemons.map((pokemon, index) => (
          <PokemonSlot
            key={index}
            phase={phase}
            pokemon={pokemon}
            removePokemon={() => handleRemoveEv1Pokemon(index)}
          />
        ))}
      </div>
    </div>
  );
};
