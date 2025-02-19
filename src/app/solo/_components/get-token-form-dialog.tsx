import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { calcFixedTokens } from '@/utils/calcTokens';
import { Store } from 'lucide-react';
import { GetTokenForm } from './get-token-form';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const GetTokenFormDialog = ({ open, setOpen }: Props) => {
  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);
  const playerMe = useMe((state) => state.player);
  const setMe = useMe((state) => state.setMe);

  const handleOnSubmit = (types: TokenType[]) => {
    const newState = { ...state };
    const newPlayer = { ...playerMe };

    const newPublicTokens = { ...state.tokens };
    const newHasTokens = { ...playerMe.tokens };

    for (const type of types) {
      newHasTokens[type].quantity += 1;
      newPublicTokens[type].quantity -= 1;
    }

    setState({
      ...newState,
      tokens: newPublicTokens,
    });
    setMe({
      ...newPlayer,
      tokens: newHasTokens,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Store />
          道具をもらう
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>道具をもらう</DialogTitle>
          <DialogDescription>
            道具は、ポケモンをゲットするために使います。自分のターンで1度だけ、同じ道具を2つか、種類が異なる道具を3つもらうことができます。（道具をもらったターンでポケモンをゲットすることはできません。）
          </DialogDescription>
        </DialogHeader>
        <GetTokenForm
          publicTokens={state.tokens}
          hasTokens={playerMe.tokens}
          hasFixedTokens={calcFixedTokens(playerMe)}
          onSubmit={handleOnSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
