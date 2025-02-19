import { Button } from '@/components/ui/button';
import TOKEN from '@/constants/token.json';
import { cn } from '@/utils/classNames';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  publicTokens: Tokens;
  hasTokens: Tokens;
  hasFixedTokens: Tokens;
  onSubmit: (types: TokenType[]) => void;
};
export const GetTokenForm = ({
  publicTokens,
  hasTokens,
  hasFixedTokens,
  onSubmit,
}: Props) => {
  const [selectedTokenTypes, setSelectedTokens] = useState<TokenType[]>([]);
  const selectToken = (key: TokenType) => {
    if (selectedTokenTypes.length > 2) return;
    if (
      selectedTokenTypes.length === 2 &&
      selectedTokenTypes[0] === selectedTokenTypes[1]
    )
      return;

    setSelectedTokens((prev) => [...prev, key]);
  };

  const getToken = () => {
    onSubmit(selectedTokenTypes);
    setSelectedTokens([]);
  };

  return (
    <div className="select-none space-y-4">
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {Object.values(TOKEN).map((value) => {
          const { TYPE, SPRITE_URL } = value;
          if (TYPE === 'gold') return null;

          const publicToken = publicTokens[TYPE as TokenType];
          const hasToken = hasTokens[TYPE as TokenType];
          const hasFixedToken = hasFixedTokens[TYPE as TokenType];

          return (
            <div key={TYPE} className="space-y-0.5">
              <Button
                variant="outline"
                className={cn(
                  'relative h-auto p-1 sm:p-2',
                  TYPE === 'red' && 'bg-red-100 hover:bg-red-50',
                  TYPE === 'green' && 'bg-green-100 hover:bg-green-50',
                  TYPE === 'yellow' && 'bg-yellow-100 hover:bg-yellow-50',
                  TYPE === 'blue' && 'bg-blue-100 hover:bg-blue-50',
                  TYPE === 'black' && 'bg-gray-200 hover:bg-gray-100',
                )}
                disabled={
                  publicToken.quantity < 1 ||
                  selectedTokenTypes.length > 2 ||
                  (selectedTokenTypes.length === 2 &&
                    selectedTokenTypes.includes(TYPE as TokenType)) ||
                  (selectedTokenTypes.length === 2 &&
                    selectedTokenTypes[0] === selectedTokenTypes[1])
                }
                onClick={() => selectToken(TYPE as TokenType)}
              >
                <Image src={SPRITE_URL} width={40} height={40} alt={TYPE} />
                <div className="absolute -right-2 -top-2 grid size-7 place-content-center rounded-full border bg-background font-mono text-lg font-bold">
                  {publicToken.quantity}
                </div>
              </Button>
              <div className="flex items-center justify-center gap-3 font-mono font-bold">
                <div>{hasToken.quantity}</div>
                <div className="text-red-600">{hasFixedToken.quantity}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <div className="flex h-[58px] grow rounded border p-2">
          {selectedTokenTypes.map((key, index) => {
            const { SPRITE_URL } =
              TOKEN[key.toUpperCase() as keyof typeof TOKEN];

            return (
              <Image
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="flex items-center"
                src={SPRITE_URL}
                width={40}
                height={40}
                alt={key}
              />
            );
          })}

          <Button
            variant="ghost"
            className="relative ml-auto size-10 w-fit p-2 [&_svg]:size-8"
            disabled={selectedTokenTypes.length === 0}
            onClick={() => setSelectedTokens([])}
          >
            <X className="fill-neutral-500" />
          </Button>
        </div>

        <Button
          className="h-[58px]"
          disabled={
            selectedTokenTypes.length < 3 &&
            !(
              selectedTokenTypes.length === 2 &&
              selectedTokenTypes[0] === selectedTokenTypes[1]
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
