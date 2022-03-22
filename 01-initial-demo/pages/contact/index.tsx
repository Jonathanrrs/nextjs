import Link from "next/link";
import { MainLayout } from "../../components/layouts/MainLayout";


/* otra manera de crear rutas, que es dentro de una carpeta */
export default function ContactPage() {
  return (
    <MainLayout>
      <h1>Contact Page</h1>
      <h1 className={"title"}>
        {/* Ir a <a href="/">Home</a> */}
        Ir a <Link href="/">Home</Link>
      </h1>

      <p className={"description"}>
        Get started by editing{" "}
        <code className={"code"}>pages/index.js</code>
      </p>
    </MainLayout>
  );
}
