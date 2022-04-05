import { GetStaticProps, NextPage,GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/layouts";

interface Props {
  // pokemon: any
  id: string;
  name: string;
}

const PokemonPage: NextPage<Props> = ({id, name}) => {
  const router = useRouter();
  console.log(router.query);
  
  return (
    <Layout title="Algun pokémon">
      <h1>{id}-{name}</h1>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
/* esto lo usamos porque tenemos la pagina con [id] */
/* se ejecuta del lado del servidor, en buildtime */
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [
      {
        params: {
          id: '1'
        }
      }
    ],
    /* si se pone un url que no fue previamente renderizado regrese 404 */
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  return {
    props: {
      id: '1',
      name: 'Bulbasar'
    },
  };
};

export default PokemonPage;
