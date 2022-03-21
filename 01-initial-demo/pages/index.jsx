import Head from "next/head";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";

/* las paginas deben ser exportación por defecto */
export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Head componente de next, es la info que debería estar literalmente en el head del html */}
      <Head>
        <title>Home -Jonathan</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1>Home page</h1>
        <h1 className={styles.title}>
          {/* Ir a <a href="/about">About</a> */}
          {/* esto es lo que se recomienda, hace un pre fetch de la página */}
          Ir a <Link href="/about">About</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  );
}
