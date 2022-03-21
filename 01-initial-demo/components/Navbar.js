import Link from "next/link";
/* debemos importarlo asi, porque si es de manera global no permite */
import styles from "./Navbar.module.css";
export const Navbar = () => {
  return (
    /* se computa para poner estilos con un guion sino no es valido para js  */
    <nav className={styles['menu-container']}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
};
