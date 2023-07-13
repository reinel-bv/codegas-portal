import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  InputLabel,
  IconButton
} from '@mui/material';
import {Add, Delete} from '@mui/icons-material';
import { Snack } from '../components/snackBar';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AlertDialog } from '../components/alertDialog/alertDialog';
import AlertConfirm from '../components/alertConfirm/alertConfirm';
import { addPuntoUser, DeletePunto } from '../store/fetch-punto';

const RenderPunto = ({puntos, handleDelete}: any) => (
  
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Dirección</TableCell>
          <TableCell>Zona</TableCell>
          <TableCell>Capacidad</TableCell>
          <TableCell>Observacion</TableCell>
          <TableCell>Latitud</TableCell>
          <TableCell>Longitud</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {puntos.map(({ _id, direccion, nombrezona, capacidad, observacion, coordenadas, lat, lng }: any) => (
          <TableRow key={_id}>
            <TableCell>{direccion}</TableCell>
            <TableCell>{nombrezona}</TableCell>
            <TableCell>{capacidad}</TableCell>
            <TableCell>{observacion}</TableCell>
            <TableCell>{lat ?lat :coordenadas.x}</TableCell>
            <TableCell>{lng ?lng :coordenadas.y}</TableCell>
            <TableCell> 
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(_id, direccion)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default function Step4({ userId, zona, puntos }: { userId: any; zona: any[], puntos: any[] }) {

  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [puntosList, setPuntosList] = useState(puntos);
  const [userSelected, setUserSelected] = useState({direccion: '', id: ''});
 
  const [value, setValue] = useState(null);

  const [selectedZona, setSelectedZona] = useState('');
  const handleZonaChange = (id: any) => {
    const label = zona.find(zona => zona._id === id).nombre;
    setSelectedZona(label)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      direccion: data.get('direccion'),
      capacidad: data.get('capacidad'),
      observacion: data.get('observacion'),
      idZona: data.get('idZona'),
      location: data.get('lat')+', '+ data.get('lng'), 
      idCliente: userId,
    };
    await saveData(newData);
  };

  const saveData = async (data: any) => {
    const { status } = await addPuntoUser(data);
    if (status) {
      setShowSnack(true);
      setMessage('Ubicación Guardada con éxito');
      setShowDialog(false);
      const [lat, lng] = data.location.split(", ");
      const updatedPunto = [...puntosList, { direccion: data.direccion, nombrezona: selectedZona, capacidad: data.capacidad, observacion: data.observacion, lat, lng }];
      setPuntosList(updatedPunto);
    }
  };
  const handleDelete = (id: any, direccion: any) => {
    setUserSelected({id, direccion})
    setOpenConfirm(true)
  };
  const confirmDelete = async () => {
    const updatedPuntosList = puntosList.filter(({_id}) => _id !== userSelected.id);
    setPuntosList(updatedPuntosList);
   
    setOpenConfirm(false)

    const {status} = await DeletePunto(userSelected.id)
    if (status) {
      setShowSnack(true)
      setMessage("Eliminado!")
    }
  }


  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {/* <GooglePlacesAutocomplete
        apiKey='AIzaSyBOmtw-FIJBd_122zsJ13IkEQPT-AtGkh0'
        apiOptions={{ language: 'es', region: 'co' }}
        selectProps={{
          onChange: setValue,
        }}
      /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <RenderPunto 
          puntos={puntosList}
          handleDelete={handleDelete} 
        />
        <Button color="primary" startIcon={<Add />} onClick={() => setShowDialog(true)}>
          Agregar
        </Button>
      </Box>
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} />
      <AlertDialog showDialog={showDialog} setShowDialog={() => setShowDialog(false)}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: 500 }}>
                <TextField id="direccion" label="Dirección" name="direccion"/>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: 500 }}>
                <TextField id="capacidad" label="Capacidad Almacenamiento" name="capacidad"/>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ width: 500 }}>
                <TextField 
                  id="observacion"
                  label="Observacion Ingreso Vehiculo"
                  name="observacion"
                  multiline
                  rows={4}
                />
              </FormControl>
            </Grid>
            <Grid container spacing={2} item xs={12} sm={12}>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <TextField id="lat" label="Latitud: 4.754017..." name="lat" />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField id="lng" label="Longitud: -74.247825..." name="lng" />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl  sx={{ width: 500 }}>
                <InputLabel id="idZona">Zonas</InputLabel>
                <Select
                  labelId="idZona"
                  id="idZona"
                  label="Zona"
                  name="idZona"
                  onChange={(e) => {
                    handleZonaChange(e.target.value);
                  }}
                >
                  {
                    zona.map(({nombre, _id})=> <MenuItem value={_id} key={_id}>{nombre}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Guardar
            </Button>
          </Grid>
        </Box>
      </AlertDialog>
      <AlertConfirm 
        openConfirm={openConfirm} 
        handleConfirm={()=>confirmDelete()} 
        handleClose={()=>setOpenConfirm(false)} 
        title={userSelected?.direccion} 
      />
    </Container>
  );
}
