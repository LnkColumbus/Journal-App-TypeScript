import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { authLogin, loginWithGoogle } from '../../features/auth';

const schema = yup.object({
  email: yup.string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
  password: yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es obligatoria')
}).required();
type FormData = yup.InferType<typeof schema>;

export const LoginPage = () => {

  const { errorMessage, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { register, formState: { errors }, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = ({ email, password }: FormData) => {
    dispatch( authLogin({ email, password }) );
  }

  const onGoogleSignIn = () => {
    dispatch(loginWithGoogle());
  }

  return (
    <AuthLayout title={'Login'}>
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Grid container>
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
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={ isAuthenticating }
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                variant="contained"
                fullWidth
                onClick={ onGoogleSignIn }
                disabled={ isAuthenticating }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿No tienes cuenta?</Typography>
            <Link component={ RouterLink } color="inherit" to="/auth/register">
              Crea una aquí
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
