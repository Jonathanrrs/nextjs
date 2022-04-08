import Head from "next/head";
import { Nabvar } from "../ui";

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

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
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        {/* se recomienda poner el path estatico, esto es para seo */}
        <meta
          property="og:image"
          content={`${origin}/img/banner.png`}
        />
      </Head>
      <Nabvar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
