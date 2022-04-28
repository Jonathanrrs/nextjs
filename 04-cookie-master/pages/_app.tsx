import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../themes";

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

/* esto se debe usar con mucho cuidado */
/* getinitialProps no es recomendable usarlo */

MyApp.getInitialProps = async (appContext: AppContext) => {

  const {theme} = appContext.ctx.req ? (appContext.ctx.req as any).cookies : {theme: 'light'}
  const validThemes = ["light", "dark", "custom"];
  return {
    theme: validThemes.includes(theme) ? theme : "dark",
  }
};

export default MyApp;
