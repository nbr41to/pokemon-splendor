import TOKEN from '@/constants/token.json';

const TOKENS = Object.values(TOKEN).slice(0, 5); // goldの除外
const TOKEN_TYPES = Object.values(TOKEN)
  .map(({ TYPE }) => TYPE as TokenType)
  .slice(0, 5) as TokenType[]; // goldの除外

export const generateFixedTokens = (
  quantity: 1 | 2,
  types: string[],
): Record<TokenType, Token> => {
  // どれかを {quantity} 個 ランダムで返す
  const tokens = {} as Record<TokenType, Token>;

  const tokenType = getTokenTypeFromTypes(types);

  for (const value of TOKENS) {
    const { TYPE, SPRITE_URL } = value;
    if (TYPE === 'gold') continue;

    tokens[TYPE as TokenType] = {
      quantity: TYPE === tokenType ? quantity : 0,
      spriteUrl: SPRITE_URL,
    };
  }

  return tokens;
};

export const getTokenTypeFromTypes = (types: string[]) => {
  const type = types[Math.floor(Math.random() * types.length)];

  switch (type) {
    case 'fire':
      return TOKEN.RED.TYPE; // 各タイプ2種類のトークンがランダムで割り当てられるようにしたい
    case 'fighting':
      return TOKEN.RED.TYPE;
    case 'grass':
      return TOKEN.GREEN.TYPE;
    case 'poison':
      return TOKEN.GREEN.TYPE;
    case 'dragon':
      return TOKEN.BLUE.TYPE;
    case 'bug':
      return TOKEN.YELLOW.TYPE;
    case 'flying':
      return TOKEN.YELLOW.TYPE;
    case 'electric':
      return TOKEN.YELLOW.TYPE;
    case 'water':
      return TOKEN.BLACK.TYPE;
    case 'ghost':
      return TOKEN.BLACK.TYPE;
    default:
      return TOKEN.BLUE.TYPE;
  }
};

export const generateRequiredTokens = (
  from: number,
  to: number,
  limitTokenTypes = 4, // 種類数上限
): Record<TokenType, Token> => {
  const tokens = {} as Record<TokenType, Token>; // {from} 〜 {to} つの配列を生成して 1 ~ 4 の数字のランダムに配列に入れる
  // 使用するトークンの種類数をランダムに決める
  const targets = TOKEN_TYPES.sort(() => Math.random() - 0.5) // シャッフル
    .slice(0, Math.floor(Math.random() * limitTokenTypes) + 1); // 上限以下の種類数のtokenを対象に

  // トークンの総数をランダムに決めて、targetsの中からランダムに選んで配列を生成
  const randomArray = Array.from({
    length: Math.floor(Math.random() * (to - from + 1)) + from,
  }).map(() => targets[Math.floor(Math.random() * targets.length)]);

  for (const value of TOKENS) {
    const { TYPE, SPRITE_URL } = value;
    if (TYPE === 'gold') continue;

    tokens[TYPE as TokenType] = {
      quantity: randomArray.filter((tokenType) => tokenType === TYPE).length,
      spriteUrl: SPRITE_URL,
    };
  }

  return tokens;
};

export const generateEvolveToken = (ev: 1 | 2): EvolutionRequiredToken => {
  const TOKENS = Object.values(TOKEN).slice(0, 5); // goldの除外
  const { TYPE, SPRITE_URL } =
    TOKENS[Math.floor(Math.random() * TOKENS.length)];

  return {
    type: TYPE as TokenType,
    quantity: Math.floor(Math.random() * ev * 2) + ev + 1,
    spriteUrl: SPRITE_URL,
  };
};
