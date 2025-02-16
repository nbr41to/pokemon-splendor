type TokenKey = 'token1' | 'token2' | 'token3' | 'token4' | 'token5';
type Token = {
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
  } | null;
};

type Player = {
  id: number;
  name: string;
  score: number;
  pokemons: Pokemon[];
  tokens: Record<TokenKey, Token>;
};
