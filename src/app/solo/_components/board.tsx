import { useGameState } from '@/lib/state/useGameState';
import { Slot } from './slot';

export const Board = () => {
  const {
    currentPhase,
    board: { ev1, ev2, ev3 },
  } = useGameState((state) => state.state);

  return (
    <div className="p-5">
      <div className="flex gap-3 overflow-x-scroll p-1">
        {ev3.map((pokemon, index) => (
          <Slot
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            phase={currentPhase}
            pokemon={pokemon}
          />
        ))}
      </div>
      <div className="flex gap-3 overflow-x-scroll p-1">
        {ev2.map((pokemon, index) => (
          <Slot
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            phase={currentPhase}
            pokemon={pokemon}
          />
        ))}
      </div>
      <div className="flex gap-3 overflow-x-scroll p-1">
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
