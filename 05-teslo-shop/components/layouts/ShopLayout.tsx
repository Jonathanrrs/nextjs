import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: JSX.Element[] | JSX.Element;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* para mejor indexacion */}
        <meta name="description" content={pageDescription} />
        {/* esto lo usan las redes sociales para mostrar el contenido */}
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>{/* navbar */}</nav>
      {/* sidebar */}
      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }}
      >
        {children}
      </main>
      {/* footer */}
      <footer>{/* custom footer */}</footer>
    </>
  );
};
