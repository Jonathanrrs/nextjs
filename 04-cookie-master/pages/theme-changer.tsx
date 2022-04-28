import { ChangeEvent, FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layouts";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface Props {
  theme: string;
}

export const ThemeChangerPage: FC<Props> = ({theme}) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);

    /* en cookies solo hay 4k de almacenamiento */
    /* las cookies se pueden mandar al backend bajo request */
    /* para almacenar en cookies */
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get("/api/hello");
    console.log({ data });
  };

  useEffect(() => {
    // console.log(localStorage.getItem("theme"));
    // console.log(Cookies.get("theme"));
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
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* server side rendering, se genera esta página bajo demanda */
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /* para leer las cookies del lado del server con next js no se ocupa el paquete de cookies js */
  const { theme = "light", name = "No name" } = req.cookies;

  const validThemes = ["light", "dark", "custom"];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "dark",
      name,
    },
  };
};

export default ThemeChangerPage;
