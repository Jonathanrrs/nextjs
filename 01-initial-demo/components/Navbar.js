import Link from "next/link";
import { ActiveLink } from "./ActiveLink";
/* debemos importarlo asi, porque si es de manera global no permite */
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    /* se computa para poner estilos con un guion sino no es valido para js  */
    <nav className={styles["menu-container"]}>
      <ActiveLink text="Home" href="/" />
      <ActiveLink text="About" href="/about" />
      <ActiveLink text="Contact" href="/contact"/>
    </nav>
  );
};
