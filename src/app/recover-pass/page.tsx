'use client'
import React, { useContext, useState } from 'react';
import { CssBaseline, Box, TextField, Typography, Avatar, Button, Container, Grid } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import {Snack} from "../components/snackBar"
import {DataContext} from "../context/context"
 
const defaultTheme = createTheme();
export default function SignIn() {
  const {recoverPass}: any = useContext(DataContext)
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
   
    handleRecoverPass(email)
  };

  const handleRecoverPass = async (email: any) =>{
    try {
      await recoverPass(email)
      setShowSnack(true)
      setMessage("Hemos enviado un link de recuperación")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperar Contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
              
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recuperar Contraseña
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/">
                   Regresar
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
      </Container>
    </ThemeProvider>
  );
}