import { useEvolve } from '@/lib/state/useEvolve';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { updateGameState } from '@/lib/supabase/actions';
import { calcTotalTokens } from '@/utils/calcTokens';
import { evolvePokemon, getPokemon, reservePokemon } from '@/utils/state';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { PokemonCard } from './pokemon-card';

type Props = {
  phase: Phase;
  pokemon: Pokemon | null;
  inReservation?: boolean;
};
export const Slot = ({ phase, pokemon, inReservation = false }: Props) => {
  const params = useParams<{ id: string | undefined }>();
  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);
  const player = useMe((state) => state.player);
  const isReserving = useMe((state) => state.isReserving);
  const setIsReserving = useMe((state) => state.setIsReserving);
  const setMe = useMe((state) => state.setMe);
  const spritesType = useMe((state) => state.settings.sprites);
  const evolveCondition = useEvolve((state) => state.evolve);

  const totalTokens = useMemo(() => calcTotalTokens(player), [player]);

  const getable = useMemo(() => {
    if (phase !== 'action' || !pokemon) return false;

    return Object.keys(pokemon.requiredTokens).every((key) => {
      const token = pokemon.requiredTokens[key as TokenType];
      return totalTokens[key as TokenType].quantity >= token.quantity;
    });
  }, [phase, pokemon, totalTokens]);

  const evolvable = useMemo(() => {
    if (phase !== 'evolve' || !evolveCondition || !pokemon) return false;

    return (
      pokemon.evolveFrom === evolveCondition.evolveFrom &&
      evolveCondition.requiredToken.quantity <=
        totalTokens[evolveCondition.requiredToken.type].quantity
    );
  }, [phase, evolveCondition, pokemon, totalTokens]);

  const handleOnClick = () => {
    if (!pokemon) return;
    /* 予約 */
    if (isReserving && !inReservation) {
      const newState = reservePokemon(state, pokemon);
      setState(newState);
      setMe(newState.players[0]);
      setIsReserving(false);
      if (params.id) {
        updateGameState(newState.id, newState);
      }
      return;
    }

    /* ゲット */
    if (phase === 'action') {
      const newState = getPokemon(state, pokemon, inReservation);
      setState(newState);
      setMe(newState.players[0]);
      if (params.id) {
        updateGameState(newState.id, newState);
      }
      return;
    }

    /* 進化 */
    if (phase === 'evolve') {
      if (!evolveCondition) return;
      const newState = evolvePokemon(
        state,
        pokemon,
        evolveCondition.evolveFromUid,
        inReservation,
      );
      setState(newState);
      setMe(newState.players[0]);
      if (params.id) {
        updateGameState(newState.id, newState);
      }
      return;
    }
  };

  return (
    <PokemonCard
      pokemon={pokemon}
      spritesType={spritesType}
      disabled={!isReserving && !getable && !evolvable}
      onClick={handleOnClick}
    />
  );
};
