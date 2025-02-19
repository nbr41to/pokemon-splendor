import {} from '@/components/ui/scroll-area';
import { useGameState } from '@/lib/state/useGameState';
import { Slot } from './slot';

export const Board = () => {
  const {
    currentPhase,
    board: { ev1, ev2, ev3 },
  } = useGameState((state) => state.state);

  return (
    <div className="p-5 sm:mx-auto sm:w-fit">
      <div className="flex gap-x-2 overflow-x-scroll">
        {ev3.map((pokemon, index) => (
          <Slot
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            phase={currentPhase}
            pokemon={pokemon}
          />
        ))}
      </div>
      <div className="flex gap-x-2 overflow-x-scroll">
        {ev2.map((pokemon, index) => (
          <Slot
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            phase={currentPhase}
            pokemon={pokemon}
          />
        ))}
      </div>
      <div className="flex gap-x-2 overflow-x-scroll">
        {ev1.map((pokemon, index) => (
          <Slot
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            phase={currentPhase}
            pokemon={pokemon}
          />
        ))}
      </div>
    </div>
  );
};
