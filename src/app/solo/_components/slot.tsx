import { useEvolve } from '@/lib/state/useEvolve';
import { useGameState } from '@/lib/state/useGameState';
import { useMe } from '@/lib/state/useMe';
import { removePokemonFromBoard } from '@/utils/board';
import { calcHasEvolvable } from '@/utils/calcAble';
import { calcFixedTokens, calcTotalTokens } from '@/utils/calcTokens';
import { reservePokemon } from '@/utils/state';
import { useMemo } from 'react';
import { PokemonCard } from './pokemon-card';

type Props = {
  phase: Phase;
  pokemon: Pokemon | null;
  inReservation?: boolean;
};
export const Slot = ({ phase, pokemon, inReservation = false }: Props) => {
  const state = useGameState((state) => state.state);
  const setState = useGameState((state) => state.setState);
  const player = useMe((state) => state.player);
  const isReserving = useMe((state) => state.isReserving);
  const setIsReserving = useMe((state) => state.setIsReserving);
  const setMe = useMe((state) => state.setMe);
  const evolveCondition = useEvolve((state) => state.evolve);

  const fixedTokens = useMemo(() => calcFixedTokens(player), [player]);
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
    if (isReserving) {
      const newState = reservePokemon(state, pokemon);
      setState(newState);
      setMe(newState.players[0]);
      setIsReserving(false);
      return;
    }

    const updatedState = { ...state };
    const updatedPlayer = { ...player };
    const { requiredTokens } = pokemon;

    if (phase === 'action') {
      for (const key of Object.keys(pokemon.requiredTokens)) {
        const requiredToken = requiredTokens[key as TokenType];
        const discountTokenQuantity =
          requiredToken.quantity - fixedTokens[key as TokenType].quantity;

        // ゲットする場合のトークンの消費処理
        if (discountTokenQuantity > 0) {
          updatedPlayer.tokens[key as TokenType].quantity =
            updatedPlayer.tokens[key as TokenType].quantity -
            discountTokenQuantity;
          // 消費したトークンを場に戻す処理
          updatedState.tokens[key as TokenType].quantity =
            updatedState.tokens[key as TokenType].quantity +
            discountTokenQuantity;
        }
      }

      updatedState.currentPhase = calcHasEvolvable(
        updatedPlayer,
        updatedState.board,
      )
        ? 'evolve'
        : 'waiting-end';
    }

    if (phase === 'evolve') {
      if (!evolveCondition) return;
      // 進化前のポケモンを削除する処理
      updatedPlayer.pokemons = updatedPlayer.pokemons.filter(
        (p) => p.uid !== evolveCondition.evolveFromUid,
      );

      updatedState.currentPhase = 'waiting-end';
    }

    // ポケモンをゲットする処理
    updatedPlayer.pokemons = [...updatedPlayer.pokemons, pokemon].sort(
      (a, b) => a.id - b.id,
    );

    setState({
      ...updatedState,
      board: removePokemonFromBoard(updatedState.board, pokemon.uid),
    });
    setMe(updatedPlayer);
  };

  return (
    <PokemonCard
      pokemon={pokemon}
      disabled={(!getable && !evolvable) || inReservation}
      onClick={handleOnClick}
    />
  );
};
