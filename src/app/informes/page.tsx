"use client"
import React, {useState, useContext} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Container, Typography, Card, CardContent, Grid, Box, Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {DataContext} from '../context/context'
import URL from '../utils/url'
import { userAgent } from 'next/server';

// import {ListInformes} from '../utils/informes'
 
const defaultTheme = createTheme();

export default function Reports() {
  const {nombre}: any = useContext(DataContext)
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);

  const ListInformes = [
    {url: `${URL}/informe/users/all/${start}/${end}/${nombre}`, text: "Todos Usuarios"},
    {url: `${URL}/informe/users/administradores/${start}/${end}/${nombre}`, text: "Usuarios corporativos"},
    {url: `${URL}/informe/users/clientes/${start}/${end}/${nombre}`, text: "Clientes"},
    {url: `${URL}/informe/users/conductores/${start}/${end}/${nombre}`, text: "Conductores"},
    {url: `${URL}/informe/pedidos/all/${start}/${end}/${nombre}`, text: "Trazabilidad"},
    {url: `${URL}/informe/pedidos/no_entregados/${start}/${end}/${nombre}`, text: "Pedidos no entregados"},
    {url: `${URL}/informe/pedidos/entregado/${start}/${end}/${nombre}`, text: "Facturación"},

    {url: `${URL}/informe/vehiculos/${start}/${end}/${nombre}`, text: "Vehiculos"},
    {url: `${URL}/informe/tanques/${start}/${end}/${nombre}`, text: "Tanques"},
    {url: `${URL}/informe/revisiones/${start}/${end}/${nombre}`, text: "Revisiones"},

    // {url: `${URL}novedades/${start}/${end}/${nombre}`, text: "Observaciones"},
    // {url: `${URL}calificaciones/${start}/${end}/${nombre}`, text: "Calificaciones"},
    // {url: `${URL}alertaTanques/${start}/${end}/${nombre}`, text: "Alertas Tanques"},
    // {url: `${URL}ultimaRev/${start}/${end}/${nombre}`, text: "Ultima Revision"},
] ;


  const redirect = (url: any) => {
    if(!start && !end){
      alert("Ambas fechas son obligatorias")
    } else{
      document.location.href = url;
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="xl"> 
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            marginBottom: 5,
            p: 5
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker 
                label="Fecha Inicio" 
                
                onChange={(newValue) => {
                  if (dayjs.isDayjs(newValue)) {
                    setStart(newValue);
                  } else {
                    setStart(null);
                  }
                }}
              />
              <DatePicker
                label="Fecha Final"
                onChange={(newValue) => {
                  if (dayjs.isDayjs(newValue)) {
                    setEnd(newValue);
                  } else {
                    setEnd(null);
                  }
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        
        <Grid container spacing={4}>
          {ListInformes.map(({text, url}, key) => (
            <Grid item key={key} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 0 }}>

                   <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={()=>redirect(url)}
                    >
                      {text}
                    </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Container>

    </ThemeProvider>
  );
}