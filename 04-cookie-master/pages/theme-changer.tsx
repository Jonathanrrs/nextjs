import { ChangeEvent, useEffect, useState } from "react";
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
export const ThemeChangerPage = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);

    /* en cookies solo hay 4k de almacenamiento */
    /* las cookies se pueden mandar al backend */
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

export default ThemeChangerPage;
