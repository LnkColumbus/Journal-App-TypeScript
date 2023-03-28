import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthLayout } from '../layout/AuthLayout'
import { authRegister } from '../../features/auth';

const schema = yup.object({
  displayName: yup.string().required('El nombre es obligatorio'),
  email: yup.string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
  password: yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es obligatoria')
}).required();
type FormData = yup.InferType<typeof schema>;

export const RegisterPage = () => {

  const { errorMessage, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { register, formState: { errors }, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = ({ displayName, email, password }: FormData) => {
    dispatch( authRegister({ displayName, email, password }) );
  }

  return (
    <AuthLayout title={'Crear Cuenta'}>
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Grid container>
        <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="nombre completo"
              fullWidth
              { ...register('displayName') }
              error={ !!errors.displayName }
              helperText={ errors.displayName?.message }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              { ...register('email') }
              error={ !!errors.email }
              helperText={ errors.email?.message }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              { ...register('password') }
              error={ !!errors.password }
              helperText={ errors.password?.message }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={ !!errorMessage ? '' : 'none' }>
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={ 12 }>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={ isAuthenticating }
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color="inherit" to="/auth/login">
              Ingresa aquí
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
