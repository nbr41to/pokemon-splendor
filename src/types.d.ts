type TokenType = 'red' | 'blue' | 'green' | 'yellow' | 'black' | 'gold';
type Token = {
  quantity: number;
  spriteUrl: string;
};
type Tokens = Record<TokenType, Token>;
type EvolutionRequiredToken = Token & {
  type: TokenType;
};

type Pokemon = {
  uid: string;
  id: number;
  name: string;
  spriteUrl: string;
  points: number;
  fixedTokens: Tokens;
  requiredTokens: Tokens;
  evolveFrom: number | null;
  evolveCondition: {
    evolveTo: number[];
    requiredToken: EvolutionRequiredToken;
    spriteUrl: string;
  } | null;
};

type Player = {
  id: string;
  name: string;
  pokemons: Pokemon[];
  tokens: Tokens;
  reservations: Pokemon[];
};

type Phase = 'action' | 'evolve' | 'waiting-end';
type GameState = {
  id: string;
  players: Player[];
  board: {
    ev1: (Pokemon | null)[];
    ev2: (Pokemon | null)[];
    ev3: (Pokemon | null)[];
  };
  tokens: Tokens;
  currentPhase: Phase;
  // currentPlayer: Player;
  // winner: Player | null;
};

type RoomPlayer = {
  id: string;
  name: string;
  isReady: boolean;
};
type Room = {
  id: string;
  name: string;
  ownerId: string;
  players: RoomPlayer[];
};

/* GM */
type StagedPokemon = {
  id: number;
  name: number;
};

/* DB */
type Game = {
  id: string;
  room: Room;
  gameState: GameState;
};
