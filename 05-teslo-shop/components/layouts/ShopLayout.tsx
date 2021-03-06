import { FC } from "react";
import Head from "next/head";
import { SideMenu } from "../ui";
import { Navbar } from "../ui/Navbar";

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
      <nav>
        <Navbar />
      </nav>
      {/* sidebar */}
      <SideMenu />
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
