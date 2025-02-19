import { Button } from '@/components/ui/button';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { calcFixedTokens } from '@/utils/calcTokens';
import { getTokens } from '@/utils/state';
import { Store } from 'lucide-react';
import { GetTokenForm } from './get-token-form';

type Props = {
  disabled: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const GetTokenFormDialog = ({ disabled, open, setOpen }: Props) => {
  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);
  const playerMe = useMe((state) => state.player);
  const setMe = useMe((state) => state.setMe);

  const handleOnSubmit = (types: TokenType[]) => {
    const newState = getTokens(state, types);

    setState(newState);
    setMe(newState.players[0]);

    setOpen(false);
  };

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="rounded-full"
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <Store />
        道具をもらう
      </Button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 h-screen w-screen"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-0 left-0 z-10 w-full bg-background p-5">
            <div className="mx-auto w-fit">
              {/* <div className="mx-auto max-w-96 space-y-2 py-4">
              <h3 className='"text-lg tracking-tight" font-semibold leading-none'>
                道具をもらう
              </h3>
              <p className="text-sm text-muted-foreground">
                道具は、ポケモンをゲットするために使います。自分のターンで1度だけ、同じ道具を2つか、種類が異なる道具を3つもらうことができます。（道具をもらったターンでポケモンをゲットすることはできません。）
              </p>
            </div> */}
              <GetTokenForm
                publicTokens={state.tokens}
                hasTokens={playerMe.tokens}
                hasFixedTokens={calcFixedTokens(playerMe)}
                onSubmit={handleOnSubmit}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
