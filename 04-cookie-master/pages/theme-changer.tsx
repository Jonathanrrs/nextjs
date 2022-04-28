import { ChangeEvent, FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layouts";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const ThemeChangerPage: FC = (props) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  console.log({ props });

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);

    /* en cookies solo hay 4k de almacenamiento */
    /* las cookies se pueden mandar al backend bajo request */
    /* para almacenar en cookies */
    Cookies.set("theme", selectedTheme);
  };

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Cuatom"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* server side rendering, se genera esta página bajo demanda */
export const getServerSideProps: GetServerSideProps = async ({req}) => {
  /* para leer las cookies del lado del server con next js no se ocupa el paquete de cookies js */
  const {theme = 'light', name = 'No name'} = req.cookies;
  return {
    props: {
      theme,
      name
    },
  };
};

export default ThemeChangerPage;
