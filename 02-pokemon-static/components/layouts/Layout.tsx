import Head from "next/head";
import { Nabvar } from "../ui";

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="author" content="Jonathan Ruiz" />
        <meta
          name="description"
          content={`Información sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      <Nabvar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
