'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import itemData from '@/constants/result-items.json';
import pokemonData from '@/constants/result-pokemons.json';
import Image from 'next/image';
import { useState } from 'react';

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
export default function Page() {
  const [itemName, setItemName] = useState('');
  const [itemResults, setItemResults] = useState<any>([]);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonResults, setPokemonResults] = useState<any>([]);

  const searchItem = () => {
    if (itemName.length < 3) return [];
    const itemResults = itemData.filter((item) => {
      const kanaQuery = replaceKana(itemName);

      if (typeof item.name.ja === 'string') {
        const kanaName = replaceKana(item.name.ja);

        return kanaName.includes(kanaQuery);
      }
    });
    setItemResults(itemResults);
  };

  const searchPokemon = () => {
    if (pokemonName.length < 3) return [];
    const pokemonResults = pokemonData.filter((item) => {
      const kanaQuery = replaceKana(pokemonName);

      if (typeof item.name.ja === 'string') {
        const kanaName = replaceKana(item.name.ja);

        return kanaName.includes(kanaQuery);
      }
    });
    setPokemonResults(pokemonResults);
  };

  // const { data } = useSWR('item-search', async () => {
  //   const { results } = await P.getPokemonsList();

  //   const responses = await Promise.all(
  //     results.map(async (result) => {
  //       try {
  //         /* 日本語名の取得 */
  //         const specy = await P.getPokemonSpeciesByName(result.name);
  //         const pokemon = await P.getPokemonByName(result.name);

  //         return {
  //           id: pokemon.id,
  //           name: {
  //             entity: result.name,
  //             en: specy.names.find((name) => name.language.name === 'en')?.name,
  //             ja: specy.names.find((name) => name.language.name === 'ja')?.name,
  //           },
  //           sprites: {
  //             default: pokemon.sprites.front_default,
  //             front_shiny: pokemon.sprites.front_shiny,
  //             officialArtwork: {
  //               default:
  //                 pokemon.sprites.other['official-artwork'].front_default,
  //               shiny: pokemon.sprites.other['official-artwork'].front_shiny,
  //             },
  //           },
  //         };
  //       } catch (error) {
  //         return;
  //       }
  //     })
  //   );

  //   // console.log(responses);

  //   return responses.filter(Boolean);
  // });

  return (
    <div className="flex justify-center gap-x-8 p-8">
      <div className="w-80">
        <div className="flex gap-2">
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Search item"
          />
          <Button disabled={itemName.length < 3} onClick={searchItem}>
            Search
          </Button>
        </div>

        <div className="divide-y py-8">
          {itemResults.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Image src={item.sprites.default} width={40} height={40} alt="" />
              <div className="text-sm">
                <div>{item.name.ja}</div>
                <div>{item.name.entity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-80">
        <div className="flex gap-2">
          <Input
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Search pokemon"
          />
          <Button disabled={pokemonName.length < 3} onClick={searchPokemon}>
            Search
          </Button>
        </div>

        <div className="divide-y py-8">
          {pokemonResults.map((pokemon) => (
            <div key={pokemon.id} className="flex gap-2">
              <Image
                src={pokemon.sprites.default}
                width={40}
                height={40}
                alt=""
              />
              <div className="text-sm">
                <div>{pokemon.name.ja}</div>
                <div>{pokemon.name.entity}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-scroll">
          <pre>{JSON.stringify(pokemonResults, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
