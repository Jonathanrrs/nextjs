import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title="Algun pokémon">
      <h1>{pokemon.name}</h1>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
/* esto lo usamos porque tenemos la pagina con [id] */
/* se ejecuta del lado del servidor, en buildtime */
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
  console.log(pokemons151);

  return {
    // paths: [
    //   {
    //     params: {
    //       id: "1",
    //     },
    //   },
    // ],
    /* esto viene a suplir lo de arriba de manera dinamica con los 151 pokemones */
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    /* si se pone un url que no fue previamente renderizado regrese 404 */
    fallback: false,
  };
};

/* aqui recibimos los params de arriba */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  /* asi lo tipamos porque si lo hacemos de la mera manera son tipos raros y largos
  y para nuestro uso asi resulta mejor como string */
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
