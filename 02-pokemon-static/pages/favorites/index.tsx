import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";

const FavoritesPage: NextPage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemon(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites">
      <NoFavorites />
    </Layout>
  );
};

export default FavoritesPage;
