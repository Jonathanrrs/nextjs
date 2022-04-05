import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/layouts";

interface Props {
  pokemon: any
}

const PokemonPage = () => {
  const router = useRouter();
  console.log(router.query);
  
  return (
    <Layout title="Algun pokémon">
      <h1>Hola poke</h1>
    </Layout>
  );
};

export default PokemonPage;
