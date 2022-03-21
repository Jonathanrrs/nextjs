import Link from "next/link";
import { MainLayout } from "../components/layouts/MainLayout";

/* las paginas deben ser exportación por defecto */
export default function HomePage() {
  return (
    <MainLayout>
      <h1>Home page</h1>
      <h1 className={"title"}>
        {/* Ir a <a href="/about">About</a> */}
        {/* esto es lo que se recomienda, hace un pre fetch de la página */}
        Ir a <Link href="/about">About</Link>
      </h1>

      <p className={"description"}>
        Get started by editing <code className={"code"}>pages/index.js</code>
      </p>
    </MainLayout>
  );
}
