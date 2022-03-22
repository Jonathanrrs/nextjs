import { CSSProperties, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/* importante indicarle de tipo cssProperties */
const style: CSSProperties = {
  color: "#0070f3",
  textDecoration: "underline",
};

interface Props {
  text: string;
  href: string;
}
/* es un functional component que tambien va a extender de esas props internamente */
export const ActiveLink: FC<Props> = ({ text, href }) => {
  /* viene de nextjs */
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <a style={asPath === href ? style : undefined}>{text}</a>
    </Link>
  );
};
