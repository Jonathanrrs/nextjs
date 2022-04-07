import React from "react";
import { Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from "./FavoriteCardPokemon";

interface Props {
  pokemons: number[];
}
export const FavoritePokemons = ({pokemons}: Props) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavoriteCardPokemon pokemonId={id} key={id} />
      ))}
    </Grid.Container>
  );
};
