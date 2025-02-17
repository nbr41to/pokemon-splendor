import { P } from './pokedex';

export const getAggregatedItems = async () => {
  const { results } = await P.getItemsList();

  const responses = await Promise.all(
    results.map(async (result) => {
      try {
        const item = await P.getItemByName(result.name);

        const jaName = item.names.find(
          (name) => name.language.name === 'ja',
        )?.name;
        if (!jaName) return; // 日本語名がないものは除外
        if (jaName.startsWith('わざマシン')) return; // わざマシンの除外
        if (jaName.startsWith('わざレコード')) return; // わざレコードの除外
        if (jaName.startsWith('データカード')) return; // データカードの除外
        if (jaName.startsWith('メガ')) return; // メガなんとかの除外
        if (jaName.endsWith('Ｚ')) return; // なんとかＺの除外
        if (jaName.endsWith('ポン')) return; // なんとかポンの除外

        const spritesUrl = item.sprites.default;
        if (!spritesUrl) return; // 画像がないものは除外

        return {
          id: item.id,
          name: {
            entity: result.name,
            en: item.names.find((name) => name.language.name === 'en')?.name,
            ja: item.names.find((name) => name.language.name === 'ja')?.name,
          },
          sprites: {
            default: spritesUrl,
          },
        };
      } catch (error) {
        console.error(error);
        return;
      }
    }),
  );

  return responses.filter((response) => response);
};
