import Head from "next/head";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About -Jonathan</title>
        <meta name="description" content="About Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h1>About Page</h1>
        <h1 className={styles.title}>
          {/* Ir a <a href="/">Home</a> */}
          Ir a <Link href="/">Home</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  );
}
