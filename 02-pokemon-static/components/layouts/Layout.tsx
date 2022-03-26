import Head from "next/head";

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
      {/* navbar */}
      <main>{children}</main>
    </>
  );
};
