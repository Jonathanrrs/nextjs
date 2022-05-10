import type { NextPage, GetServerSideProps } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout
      title={"Teslo-shop - Search"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
    >
      {/* bueno para el seo el typography */}
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        ABC ---123
      </Typography>
      <ProductList products={products} />
    </ShopLayout>
  );
};

/* ssr para no crear páginas por cada peticion que se haga */

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };
  /* no tiene sentido hacer una peticion a nuestro propio backend, son 2 veces */

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  /* todo ,retornar otros productos */

  return {
    props: {
      products,
    },
  };
};

export default SearchPage;
