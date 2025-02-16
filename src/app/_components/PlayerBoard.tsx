import { usePlayer } from '@/lib/state/usePlayer';
import Image from 'next/image';

export const PlayerBoard = () => {
  const player = usePlayer((state) => state.player);

  console.log('PlayerBoard', player.tokens.token4);

  return (
    <div>
      <div className="">
        {Object.keys(player.tokens).map((key) => {
          const token = player.tokens[key as TokenKey];

          return (
            <div key={key} className="flex items-center">
              <div>
                <Image src={token.spriteUrl} width={40} height={40} alt={key} />
              </div>
              <div className="text-xl font-bold font-mono">
                {token.quantity}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
