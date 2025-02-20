import { Button } from '@/components/ui/button';
import { useEvolve } from '@/lib/state/useEvolve';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { calcEvolvable } from '@/utils/calcAble';
import { cancelEvolve } from '@/utils/state';
import { PokemonCardCarrying } from './pokemon-card-carrying';

export const GotPokemons = () => {
  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);

  const player = useMe((state) => state.player);
  const spritesType = useMe((state) => state.settings.sprites);

  const evolve = useEvolve((state) => state.evolve);
  const setEvolve = useEvolve((state) => state.setEvolve);

  const handleOnCancelEvolve = () => {
    const newState = cancelEvolve(state);
    setState(newState);
  };

  return (
    <>
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 py-2 sm:justify-start">
        {player.pokemons.map((pokemon) => (
          <PokemonCardCarrying
            key={pokemon.uid}
            pokemon={pokemon}
            spritesType={spritesType}
            selected={evolve?.evolveFromUid === pokemon.uid}
            disabled={
              state.currentPhase !== 'evolve' ||
              !calcEvolvable(pokemon, player, state.board)
            }
            onClick={() => {
              if (!pokemon.evolveCondition) return;
              setEvolve({
                ...pokemon.evolveCondition,
                evolveFromUid: pokemon.uid,
                evolveFrom: pokemon.id,
              });
            }}
          />
        ))}
      </div>

      {state.currentPhase === 'evolve' && (
        <div className="fixed bottom-0 left-0 z-10 w-full bg-background p-5">
          <div className="mx-auto w-fit">
            <Button
              variant="destructive"
              className="rounded-full"
              disabled={state.currentPhase !== 'evolve'}
              onClick={handleOnCancelEvolve}
            >
              進化しない
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
