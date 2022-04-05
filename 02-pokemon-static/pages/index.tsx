import type { NextPage, GetStaticProps } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de pokemones">
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            #{pokemon.id}-{pokemon.name}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

/* esto se ejecuta en el build de la aplicacion */
/* estas props las recibimos en en las props del componente de arriba */
/* esto se ejeceuta del lado del servidor, solo puede hacerse en las pages, no en los componentes */
/* Usar esto cuando sepamos de antemano que vamos a utilizar esta información */
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });
  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
