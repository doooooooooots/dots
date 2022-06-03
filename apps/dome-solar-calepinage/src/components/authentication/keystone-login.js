import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

const KeystoneLogin = (props) => {
  const [serverError, setServerError] = useState('');

  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
    },
    resolver: yupResolver(
      Yup.object({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })
    ),
  });

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await login(values.email, values.password);

      if (isMounted()) {
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl).catch(console.error);
      }
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} {...props}>
      <Controller
        render={({ field }) => (
          <TextField
            label="Email Address"
            margin="normal"
            type="email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            autoFocus
            fullWidth
            {...field}
          />
        )}
        name="email"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            label="Password"
            margin="normal"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            fullWidth
            {...field}
          />
        )}
        name="password"
        control={control}
      />

      <Box sx={{ mt: 2 }}>
        <Button fullWidth size="large" type="submit" variant="contained">
          Log In
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {serverError && (
          <Alert severity="error">
            <Typography>{serverError}</Typography>
          </Alert>
        )}
      </Box>
    </form>
  );
};

export default KeystoneLogin;
