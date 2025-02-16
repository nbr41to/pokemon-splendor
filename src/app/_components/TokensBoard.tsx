import { Button } from '@/components/ui/button';
import TOKENS from '@/constants/tokens.json';
import { usePlayer } from '@/lib/state/usePlayer';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const TokensBoard = () => {
  const [selectedTokens, setSelectedTokens] = useState<TokenKey[]>([]);
  const selectToken = (key: TokenKey) => {
    if (selectedTokens.length > 2) return;
    if (selectedTokens.length === 2 && selectedTokens[0] === selectedTokens[1])
      return;

    setSelectedTokens((prev) => [...prev, key]);
  };
  const removeToken = (key: TokenKey) => {
    setSelectedTokens((prev) => prev.filter((k) => k !== key));
  };

  const player = usePlayer((state) => state.player);
  const setTokens = usePlayer((state) => state.setTokens);

  const getToken = () => {
    const newTokens = { ...player.tokens };
    for (const key of selectedTokens) {
      newTokens[key].quantity += 1;
    }

    setTokens(newTokens);
    setSelectedTokens([]);
  };

  return (
    <div className="select-none w-fit py-2 space-y-4">
      <div className="flex flex-wrap gap-4">
        {TOKENS.map((token) => {
          if (token.key === 'token5') return null;

          return (
            <Button
              key={token.key}
              variant="outline"
              className="h-auto relative p-2"
              disabled={
                selectedTokens.length > 2 ||
                (selectedTokens.length === 2 &&
                  selectedTokens.includes(token.key as TokenKey)) ||
                (selectedTokens.length === 2 &&
                  selectedTokens[0] === selectedTokens[1])
              }
              onClick={() => selectToken(token.key as TokenKey)}
            >
              <Image
                src={token.spriteUrl}
                width={48}
                height={48}
                alt={token.name}
              />
              <div className="font-bold text-xl absolute -top-2 -right-2 rounded-full size-7 border grid place-content-center bg-background">
                4
              </div>
            </Button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <div className="flex p-2 border rounded grow h-[58px]">
          {selectedTokens.map((key, index) => {
            const token = player.tokens[key];
            return (
              <Image
                key={index}
                className="flex items-center"
                src={token.spriteUrl}
                width={40}
                height={40}
                alt={key}
              />
            );
          })}

          <Button
            variant="ghost"
            className="size-10 relative p-2 [&_svg]:size-8 ml-auto w-fit"
            disabled={selectedTokens.length === 0}
            onClick={() => setSelectedTokens([])}
          >
            <X className="fill-neutral-500" />
          </Button>
        </div>

        <Button
          className="h-[58px]"
          disabled={
            selectedTokens.length < 3 &&
            !(
              selectedTokens.length === 2 &&
              selectedTokens[0] === selectedTokens[1]
            )
          }
          onClick={getToken}
        >
          決 定
        </Button>
      </div>
    </div>
  );
};
