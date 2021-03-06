import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import NextLink from "next/link";
import { ErrorOutline } from "@mui/icons-material";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  console.log(router.query.p?.toString());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    /* Para que no pueda regresar al login */
    const destination = router.query.p?.toString() || "/";
    router.replace(destination);
  };
  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar sesión
              </Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                /* react jook form */
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                /* !! si existe un error, de valor booleano */
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                /* !! si existe un error, de valor booleano */
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?=p${router.query.p}`
                    : "/auth/register"
                }
                passHref
              >
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
