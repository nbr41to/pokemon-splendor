import { Separator } from '@/components/ui/separator';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { calcScore } from '@/utils/calcScore';
import { calcFixedTokens } from '@/utils/calcTokens';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

export const CurrentTokensHeader = () => {
  const { turnCount } = useGameState((state) => state.state);
  const player = useMe((state) => state.player);
  const fixedTokens = useMemo(() => calcFixedTokens(player), [player]);

  return (
    <div className="fixed left-0 top-1/4 z-10 rounded-br-md bg-background/80 p-2 sm:top-0">
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <Trophy className="size-6 stroke-blue-700" />
        <span className="font-mono font-bold text-blue-700 sm:text-xl">
          {calcScore(player.pokemons)}
        </span>
      </div>

      <Separator className="my-2" />

      {Object.keys(player.tokens).map((key) => {
        const token = player.tokens[key as TokenType];

        return (
          <div
            key={key}
            className="flex items-center font-mono font-bold sm:text-xl"
          >
            <Image
              className="mx-1 block sm:hidden"
              src={token.spriteUrl}
              width={28}
              height={28}
              alt={key}
            />
            <Image
              className="mx-1 hidden sm:block"
              src={token.spriteUrl}
              width={32}
              height={32}
              alt={key}
            />
            <div className="text-orange-500">
              {token.quantity + fixedTokens[key as TokenType].quantity}
            </div>
            <div className="pl-3">{token.quantity}</div>
            <div className="pl-3 text-red-600">
              {fixedTokens[key as TokenType].quantity}
            </div>
          </div>
        );
      })}
      <Separator className="my-2" />

      <div className="text-right">
        <span className="text-sm font-bold">ターン数:</span>
        <span className="font-mono sm:text-xl"> {turnCount}</span>
      </div>
    </div>
  );
};
