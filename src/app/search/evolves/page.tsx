'use client';

import evolvesData from '@/constants/generated/evolves.json';
import pokemonsData from '@/constants/generated/pokemons.json';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="space-y-10 p-10">
      <h1 className="text-center">Evolves</h1>

      <div className="mx-auto w-fit divide-y">
        {evolvesData.map((evolve) => {
          const pokemon = pokemonsData.find((p) => p.id === evolve.base);
          if (!pokemon) return null;

          return (
            <div key={pokemon.id} className="flex items-center gap-x-4">
              <div className="flex min-w-40 items-center">
                <Image
                  src={pokemon.sprites.default}
                  width={80}
                  height={80}
                  alt=""
                />
                <div>
                  <div>{pokemon.name.entity}</div>
                  <div>{pokemon.name.ja}</div>
                </div>
              </div>
              {evolve.evolves.ev2 && (
                <>
                  <ChevronsRight className="mx-2" />
                  <div className="min-w-40">
                    {evolve.evolves.ev2.map((evolveTo) => {
                      const pokemon = pokemonsData.find(
                        (p) => p.id === evolveTo,
                      );
                      if (!pokemon) return null;

                      return (
                        <div key={pokemon.id} className="flex items-center">
                          <Image
                            src={pokemon.sprites.default}
                            width={80}
                            height={80}
                            alt=""
                          />
                          <div>
                            <div>{pokemon.name.entity}</div>
                            <div>{pokemon.name.ja}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {evolve.evolves.ev3 && (
                <>
                  <ChevronsRight className="mx-2" />
                  <div className="min-w-40">
                    {evolve.evolves.ev3.map((evolveTo) => {
                      const pokemon = pokemonsData.find(
                        (p) => p.id === evolveTo,
                      );
                      if (!pokemon) return null;

                      return (
                        <div key={pokemon.id} className="flex items-center">
                          <Image
                            src={pokemon.sprites.default}
                            width={80}
                            height={80}
                            alt=""
                          />
                          <div>
                            <div>{pokemon.name.entity}</div>
                            <div>{pokemon.name.ja}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
