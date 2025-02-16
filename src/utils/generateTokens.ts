import TOKENS from '@/constants/tokens.json';

export const getTokens = (quantity: 1 | 2): Record<TokenKey, Token> => {
  // どれかを {quantity} 個 ランダムで返す
  const tokens = {} as Record<TokenKey, Token>;

  const tokenKey = `token${Math.floor(Math.random() * 5) + 1}`; // token6は使用しない

  for (const key of TOKENS.map((t) => t.key)) {
    const token = TOKENS.find((t) => t.key === key) as (typeof TOKENS)[number];

    tokens[key as TokenKey] = {
      quantity: key === tokenKey ? quantity : 0,
      spriteUrl: token.spriteUrl,
    };
  }

  return tokens;
};

export const generateRequiredTokens = (
  from: number,
  to: number,
  limitTokenKeys = 4, // 種類数上限
): Record<TokenKey, Token> => {
  const tokens = {} as Record<TokenKey, Token>; // {from} 〜 {to} つの配列を生成して 1 ~ 4 の数字のランダムに配列に入れる
  // 使用するトークンの種類数をランダムに決める
  const targets = [1, 2, 3, 4, 5]
    .sort(() => Math.random() - 0.5) // シャッフル
    .slice(0, Math.floor(Math.random() * limitTokenKeys) + 1); // 上限以下の種類数のtokenを対象に
  const randomArray = Array.from({
    length: Math.floor(Math.random() * (to - from + 1)) + from,
  }).map(() => Math.floor(Math.random() * targets.length) + 1);

  for (const key of TOKENS.map((t) => t.key)) {
    const token = TOKENS.find((t) => t.key === key) as (typeof TOKENS)[number];

    tokens[key as TokenKey] = {
      quantity: randomArray.filter((r) => `token${r}` === key).length,
      spriteUrl: token.spriteUrl,
    };
  }

  return tokens;
};

export const generateEvolveToken = (ev: 1 | 2): EvolutionRequiredToken => {
  const tokenKey = `token${Math.floor(Math.random() * 5) + 1}` as TokenKey; // token6は使用しない

  return {
    key: tokenKey,
    quantity: Math.floor(Math.random() * ev * 2) + ev + 1,
    spriteUrl: TOKENS.find((t) => t.key === tokenKey)?.spriteUrl as string,
  };
};
