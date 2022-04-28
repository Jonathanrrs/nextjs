import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme, customTheme } from "../themes";
import Cookies from "js-cookie";

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    /* el server no ejecuta lo que hay aqui dentro */

    /* sino fuera por esto en un useefect habria posiblemente un error al obtener
    el theme porque en el server y front serian diferentes */
    const cookieTheme = Cookies.get("theme") || "light";
    const selectedTheme: Theme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;
    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

/* esto se debe usar con mucho cuidado */
/* getinitialProps no es recomendable usarlo, ademas nos convierte todas las paginas
en server side */

// MyApp.getInitialProps = async (appContext: AppContext) => {

//   const {theme} = appContext.ctx.req ? (appContext.ctx.req as any).cookies : {theme: 'light'}
//   const validThemes = ["light", "dark", "custom"];
//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   }
// };

export default MyApp;
