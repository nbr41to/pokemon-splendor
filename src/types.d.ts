type TokenKey = 'token1' | 'token2' | 'token3' | 'token4' | 'token5' | 'token6';
type TokenType =
  | 'token1'
  | 'token2'
  | 'token3'
  | 'token4'
  | 'token5'
  | 'token6';
type Token = {
  // type: TokenType;
  quantity: number;
  spriteUrl: string;
};
type EvolutionRequiredToken = {
  key: TokenKey;
  quantity: number;
  spriteUrl: string;
};

type Pokemon = {
  id: number;
  name: string;
  spriteUrl: string;
  requiredTokens: Record<TokenKey, Token>;
  tokens: Record<TokenKey, Token>;
  points: number;
  evolution: {
    id: number;
    spriteUrl: string;
    requiredToken: EvolutionRequiredToken;
  } | null;
};

type Player = {
  id: number;
  name: string;
  score: number;
  pokemons: Pokemon[];
  tokens: Record<TokenKey, Token>;
  reservations: Pokemon[];
};

type Phase = 'action' | 'evolve';
type GameState = {
  id: number;
  players: Player[];
  board: {
    ev1: (Pokemon | null)[];
    ev2: (Pokemon | null)[];
    ev3: (Pokemon | null)[];
  };
  tokens: Record<TokenKey, Token>;
  currentPlayer: Player;
  currentPhase: Phase;
  winner: Player | null;
};

/* GM */
type StagedPokemon = {
  id: number;
  name: number;
};
