import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  /* es para utilizar nuestros layout anidado de about js */
  const getLayout = Component.getLayout || ((page) => page);

  // return <Component {...pageProps} />
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
