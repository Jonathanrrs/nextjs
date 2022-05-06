import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  return (
    <ShopLayout
      title={"Teslo-shop - Home"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
    >
      {/* bueno para el seo el typography */}
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <h1>Cargando</h1> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
