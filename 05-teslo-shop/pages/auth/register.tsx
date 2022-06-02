import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterForm = async ({ email, password, name }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message || "");
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace("/");
  };

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
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
                label="Nombre completo"
                variant="filled"
                fullWidth
                type="text"
                /* react hook form */
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                type="email"
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
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
                  required: "Este campo es requierdo",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
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
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
