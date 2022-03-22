import { ActiveLink } from "./ActiveLink";
/* debemos importarlo asi, porque si es de manera global no permite */
import styles from "./Navbar.module.css";

const menuItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Contact",
    href: "/contact",
  },
  {
    text: "Pricing",
    href: "/pricing",
  },
];

export const Navbar = () => {
  return (
    /* se computa para poner estilos con un guion sino no es valido para js  */
    <nav className={styles["menu-container"]}>
      {/* <ActiveLink text="Home" href="/" />
      <ActiveLink text="About" href="/about" />
      <ActiveLink text="Contact" href="/contact"/> */}
      {menuItems.map((link) => (
        <ActiveLink text={link.text} href={link.href} key={link.href} />
      ))}
    </nav>
  );
};
