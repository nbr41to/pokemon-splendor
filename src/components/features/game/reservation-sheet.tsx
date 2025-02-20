import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { Bookmark } from 'lucide-react';
import { Slot } from './slot';

export const ReservationSheet = () => {
  const currentPhase = useGameState((state) => state.state.currentPhase);
  const player = useMe((state) => state.player);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-neutral-300">
        <SheetHeader>
          <SheetTitle>予約したポケモン</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        <div>
          {player.reservations.map((pokemon) => (
            <Slot
              key={pokemon.uid}
              phase={currentPhase}
              pokemon={pokemon}
              inReservation
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
