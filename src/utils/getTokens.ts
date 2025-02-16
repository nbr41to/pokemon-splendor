import TOKENS from '@/constants/tokens.json';

export const getTokens = (/* TODO: 作りたいToken乱数を渡すように */): Record<
  TokenKey,
  Token
> => {
  // どれかを 1〜2個 ランダムで返す
  const tokens = {} as Record<TokenKey, Token>;

  const tokenKey = `token${Math.floor(Math.random() * 4) + 1}`; // token5は使用しない

  for (const key of TOKENS.map((t) => t.key)) {
    const token = TOKENS.find((t) => t.key === key) as (typeof TOKENS)[number];

    tokens[key as TokenKey] = {
      quantity: key === tokenKey ? Math.floor(Math.random() * 2) + 1 : 0,
      spriteUrl: token.spriteUrl,
    };
  }

  return tokens;
};

export const getRequiredTokens =
  (/* TODO: 作りたいToken乱数を渡すように */): Record<TokenKey, Token> => {
    // 全てから 2〜5個 ランダムで返す
    const tokens = {} as Record<TokenKey, Token>;

    // 2〜5この配列を生成して 1 ~ 5 の数字のランダムに配列に入れる
    const randomArray = Array.from({
      length: Math.floor(Math.random() * 4) + 2,
    }).map(() => Math.floor(Math.random() * 4) + 1); // token5は使用しない

    for (const key of TOKENS.map((t) => t.key)) {
      const token = TOKENS.find(
        (t) => t.key === key
      ) as (typeof TOKENS)[number];

      tokens[key as TokenKey] = {
        quantity: randomArray.filter((r) => `token${r}` === key).length,
        spriteUrl: token.spriteUrl,
      };
    }

    return tokens;
  };
