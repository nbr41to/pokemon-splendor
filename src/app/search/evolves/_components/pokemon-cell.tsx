'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type pokemonsData from '@/constants/generated/pokemons.json';
import { useStagedPokemons } from '@/lib/state/useStagedPokemons';
import { CirclePlus, Copy } from 'lucide-react';
import Image from 'next/image';

type Props = {
  pokemon: (typeof pokemonsData)[number];
};
export const PokemonCell = ({ pokemon }: Props) => {
  const addPokemon = useStagedPokemons((state) => state.addPokemon);
  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(pokemon, null, 2));
  };

  return (
    <Dialog>
      <DialogTrigger className="flex w-40 min-w-40 items-center">
        <Image src={pokemon.sprites.default} width={80} height={80} alt="" />
        <div className="space-y-1">
          <div className="text-left text-sm">{pokemon.name.entity}</div>
          <div className="text-left">{pokemon.name.ja}</div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <DialogTitle>{pokemon.name.ja}</DialogTitle>
            <Button size="icon" onClick={() => addPokemon(pokemon.id)}>
              <CirclePlus />
            </Button>
          </div>
          <DialogDescription>{pokemon.name.entity}</DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden">
          <div className="flex py-4">
            <Image
              src={pokemon.sprites.default}
              width={80}
              height={80}
              alt=""
            />
            <Image
              src={pokemon.sprites.front_shiny}
              width={80}
              height={80}
              alt=""
            />
            <Image
              src={pokemon.sprites.officialArtwork.default}
              width={80}
              height={80}
              alt=""
            />
            <Image
              src={pokemon.sprites.officialArtwork.shiny}
              width={80}
              height={80}
              alt=""
            />
          </div>
          <div className="relative overflow-scroll rounded-md border p-4 text-xs font-bold">
            <pre>{JSON.stringify(pokemon, null, 2)}</pre>
            <Button
              variant="secondary"
              size="icon"
              onClick={copyJsonToClipboard}
              className="absolute right-2 top-2"
            >
              <Copy />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
