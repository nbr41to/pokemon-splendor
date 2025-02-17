import { usePlayer } from '@/lib/state/usePlayer';
import { calcScore } from '@/utils/calcScore';
import { calcFixedTokens } from '@/utils/calcTokens';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { PlayerPokemon } from './PlayerPokemon';

export const PlayerBoard = () => {
  const player = usePlayer((state) => state.player);
  const fixedTokens = useMemo(() => calcFixedTokens(player), [player]);

  return (
    <>
      <div className="fixed left-0 top-8 z-10 rounded-r-md bg-background/60 p-4 md:top-0">
        <div className="flex items-center">
          <Trophy size={24} className="m-2 stroke-blue-700" />
          <span className="font-mono text-xl font-bold text-blue-700">
            {calcScore(player.pokemons)}
          </span>
        </div>
        {Object.keys(player.tokens).map((key) => {
          const token = player.tokens[key as TokenKey];

          return (
            <div key={key} className="flex items-center">
              <div>
                <Image src={token.spriteUrl} width={40} height={40} alt={key} />
              </div>
              <div className="font-mono text-xl font-bold">
                {token.quantity}
              </div>
              <div className="ml-4 font-mono text-xl font-bold text-red-600">
                {fixedTokens[key as TokenKey].quantity}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto w-fit">
        <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 py-2 md:justify-start">
          {player.pokemons.map((pokemon, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <PlayerPokemon key={index} phase="action" pokemon={pokemon} />
          ))}
        </div>
      </div>
    </>
  );
};
