import { P } from './pokedex';

const getIdFromUrl = (url: string) => Number(url.split('/').at(-2));
export const getAggregatedPokemons = async () => {
  const { results } = await P.getPokemonsList();

  const responses = await Promise.all(
    results.map(async (result) => {
      try {
        const pokemon = await P.getPokemonByName(result.name);
        const species = await P.getPokemonSpeciesByName(result.name);
        const evolvesFromId = species.evolves_from_species
          ? getIdFromUrl(species.evolves_from_species.url)
          : null;
        const evolutionChainId = getIdFromUrl(species.evolution_chain.url);
        const evolutionChain = await P.getEvolutionChainById(evolutionChainId);
        const evolves = {
          ev1: getIdFromUrl(evolutionChain.chain.species.url),
          ev2:
            evolutionChain.chain.evolves_to.length > 0
              ? evolutionChain.chain.evolves_to.map((ev) =>
                  getIdFromUrl(ev.species.url),
                )
              : null,
          ev3:
            evolutionChain.chain.evolves_to.length > 0
              ? evolutionChain.chain.evolves_to
                  .flatMap((ev) =>
                    ev.evolves_to.length > 0
                      ? ev.evolves_to.map((ev2) =>
                          getIdFromUrl(ev2.species.url),
                        )
                      : [],
                  )
                  .filter((ev) => ev !== null)
              : null,
        };

        if (evolves.ev2?.length === 0) evolves.ev2 = null;
        if (evolves.ev3?.length === 0) evolves.ev3 = null;
        const ev = evolves.ev3?.includes(pokemon.id)
          ? 3
          : evolves.ev2?.includes(pokemon.id)
            ? 2
            : 1;

        return {
          id: pokemon.id,
          name: {
            entity: result.name,
            en: species.names.find((name) => name.language.name === 'en')?.name,
            ja: species.names.find((name) => name.language.name === 'ja')?.name,
          },
          types: pokemon.types.map((type) => type.type.name),
          evolves: evolves,
          ev: ev,
          evolvesFrom: evolvesFromId,
          evolvesTo: ev === 3 ? null : evolves[`ev${ev + 1}` as 'ev2' | 'ev3'],
          sprites: {
            default: pokemon.sprites.front_default,
            front_shiny: pokemon.sprites.front_shiny,
            officialArtwork: {
              default: pokemon.sprites.other['official-artwork'].front_default,
              shiny: pokemon.sprites.other['official-artwork'].front_shiny,
            },
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

export const getAggregatedEvolves = async () => {
  const { results } = await P.getEvolutionChainsList();

  const responses = await Promise.all(
    results.map(async (result) => {
      try {
        const evolutionChain = await P.getEvolutionChainById(
          getIdFromUrl(result.url),
        );
        const evolves = {
          ev1: getIdFromUrl(evolutionChain.chain.species.url),
          ev2:
            evolutionChain.chain.evolves_to.length > 0
              ? evolutionChain.chain.evolves_to.map((ev) =>
                  getIdFromUrl(ev.species.url),
                )
              : null,
          ev3:
            evolutionChain.chain.evolves_to.length > 0
              ? evolutionChain.chain.evolves_to
                  .flatMap((ev) =>
                    ev.evolves_to.length > 0
                      ? ev.evolves_to.map((ev2) =>
                          getIdFromUrl(ev2.species.url),
                        )
                      : [],
                  )
                  .filter((ev) => ev !== null)
              : null,
        };

        if (evolves.ev2?.length === 0) evolves.ev2 = null;
        if (evolves.ev3?.length === 0) evolves.ev3 = null;

        return {
          id: getIdFromUrl(result.url),
          base: getIdFromUrl(evolutionChain.chain.species.url),
          evolves: evolves,
        };
      } catch (error) {
        console.error(error);
        return;
      }
    }),
  );

  return responses.filter((response) => response);
};
