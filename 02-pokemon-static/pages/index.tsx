import type { NextPage, GetStaticProps } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListResponse } from "../interfaces";

const HomePage: NextPage = (props) => {
  console.log(props);

  return (
    <Layout title="Listado de pokemones">
      <ul>
        <li>Pokemon</li>
        <li>Pokemon</li>
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
  console.log(data);

  return {
    props: {
      pokemons: data.results,
    },
  };
};

export default HomePage;
