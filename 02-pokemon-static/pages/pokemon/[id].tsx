import { useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState<boolean>(
    localFavorites.existInFavorites(pokemon.id)
  );

  /* esta parte se corre en el front y tambien en el back */
  /* aqui no sirve el window del front, por ejemplo no podemos usar localstorage */
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default || "no-image"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
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
    // fallback: false,
    fallback: "blocking",
  };
};

/* aqui recibimos los params de arriba */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  /* asi lo tipamos porque si lo hacemos de la mera manera son tipos raros y largos
  y para nuestro uso asi resulta mejor como string */
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if(!pokemon) {
    return {
      redirect: {
        destination: '/',
        /* esto ayuda a los bots de google, false porque en un futuro
        los de pokemon pueden crear dicho pokemon */
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400 /* seconds */,
  };
};

export default PokemonPage;
