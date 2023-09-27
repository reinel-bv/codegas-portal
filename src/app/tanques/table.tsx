'use client' 
import { Fragment, useState } from 'react';
import { TableRow, TableCell, Box, Grid, Collapse, Button, Typography, Paper, Table, TableBody, TableContainer, TableHead, FormControl, TextField, Autocomplete, InputLabel, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {KeyboardArrowDown, KeyboardArrowUp, Edit} from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaginationTable } from "../components/pagination/pagination";
import { AlertDialog } from '../components/alertDialog/alertDialog';
import {Detail} from "./detail"
import {Snack} from "../components/snackBar"
import {getPuntos} from '../store/fetch-punto'
import {addUserTanque} from "../store/fetch-tanque"

const RenderTanques = ({_id, codigoactivo, capacidad, fabricante, registroonac, fechaUltimaRev: fechaMto, nplaca: placaMan, serie, anofabricacion, existeTanque: ubicacion, ultimrevtotal, propiedad, direccion, razon_social, codt, data, handleDialog, setUser}: any) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment> 
      <TableRow
        key={_id}
      >
        <TableCell align="center" component="th">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{_id}</TableCell>
        <TableCell align="center">{codigoactivo}</TableCell>
        <TableCell align="center">{capacidad}</TableCell>
        <TableCell align="center">{fabricante}</TableCell>
        <TableCell align="center">{registroonac}</TableCell>
        <TableCell align="center">{fechaMto} </TableCell>
        <TableCell align="center">{placaMan} </TableCell>
        <TableCell align="center">
          {
            data.length===0
            ?<Button variant="contained">No</Button>
            :<Button variant="contained" onClick={()=>handleDialog(_id)} color='error'>{data.length} Alertas</Button>
          }
        </TableCell>
        <TableCell align="center">
          <Button variant="contained" onClick={()=>handleDialog(_id)}>Ver</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Datos adicionales
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Serie</TableCell>
                      <TableCell align="center">Año Fab.</TableCell>
                      <TableCell align="center">Ubicación Tan</TableCell>
                      <TableCell align="center">Ultima Rev Tot</TableCell>
                      <TableCell align="center">Propiedad</TableCell>
                      <TableCell align="center">Punto</TableCell>
                      <TableCell align="center">Usuario</TableCell>
                      <TableCell align="center">Codt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">{serie}</TableCell>
                      <TableCell align="center">{anofabricacion}</TableCell>
                      <TableCell align="center">{ubicacion}</TableCell>
                      <TableCell align="center">{ultimrevtotal}</TableCell>
                      <TableCell align="center">{propiedad}</TableCell>
                      <TableCell align="center">{direccion}</TableCell>
                      <TableCell align="center">
                        {razon_social}
                        <Button variant="contained" onClick={()=>setUser(_id)} color='success'>  <Edit /></Button>
                      </TableCell>
                      <TableCell align="center">{codt}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default function RenderTable({tanques, users}: any) {
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogUser, setShowDialogUser] = useState(false);
  const [tanqueId, setTanqueId] = useState(null);
  const [puntosList, setPuntosList] = useState([]);
  const [clienteId, setClientId] = useState(null);
  const [puntoId, setPuntoId] = useState(null);
  const [tanque, setTanque] = useState({});
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let idUser = searchParams.get('idUser');
  let page = searchParams.get('page');
  let search = searchParams.get('search');
  const handleDialog = (id: any) => {
    setShowDialog(true)
    const filterTanque = tanques.filter(({_id}: any) => {return id===_id})
    setTanque(filterTanque[0])
  }
  const searchUser = async (event: any) => {
    if(event.key === 'Enter') {
      router.push(`${pathname}?page=${page}&idUser=${idUser}&search=${search}&searchUser=${event.target.value}`, undefined)
    }
  } 
  const handleChangeSelect = async (_: any, value: any) => {
    const {puntos} = await getPuntos(value._id, "1");
    setPuntosList(puntos);
    setPuntoId(value._id);
    setClientId(value._id);
  };
  const handleChangePunto = (event: any) => {
    setPuntoId(event.target.value);
  };
 
   
  const saveData = async () => {
    const newData = {
      puntoId,
      usuarioId: clienteId,
      tanqueId
    };
    console.log(newData)
    const {status} = await addUserTanque(newData)
    if (status) {
      setShowSnack(true)
      setMessage("Usuario Guardado con exito")
      router.push(`${pathname}?page=${page}&idUser=${idUser}&search=${search}&searchUser=${undefined}`, undefined)
      setShowDialogUser(false)
      setTanqueId(null)
      setPuntoId(null)
      setClientId(null)
    }
  }

  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">Codigo Act.</TableCell>
              <TableCell align="center">Capacidad</TableCell>
              <TableCell align="center">Fabricante</TableCell>
              <TableCell align="center">Registro On.</TableCell>
              <TableCell align="center">Fecha Mto</TableCell>
              <TableCell align="center">Placa Man.</TableCell>
              <TableCell align="center">Alertas</TableCell>
              <TableCell align="center">Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            tanques.map((e: any, key: string)=> (<RenderTanques {...e} key={key} handleDialog={handleDialog}  setUser={(id)=>{setTanqueId(id); setShowDialogUser(true)}} /> ))
          }
          
        </TableBody>
      </Table>
      <PaginationTable total={tanques[0]?.total ?? 0} />
      <Detail showDialog={showDialog} setShowDialog={setShowDialog} tanque={tanque} />
      <AlertDialog showDialog={showDialogUser} setShowDialog={() => setShowDialogUser(false)}>
        <Grid item xs={12} sm={12} mb={5}>
          <FormControl fullWidth>
            <Autocomplete
              sx={{ width: 400 }}
              freeSolo
              id="users"
              disableClearable
              options={users}
              getOptionLabel={(option) => option.razon_social?? ""}
              onChange={handleChangeSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar Usuarios..."
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    onKeyDown: searchUser,
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
          {
            puntosList && puntosList.length!==0
            &&<Grid item xs={12} sm={12} mb={5}>
              <FormControl fullWidth>
                <InputLabel id="puntoId">Punto</InputLabel>
                <Select
                  required
                  labelId="puntoId"
                  id="puntoId"
                  name="puntoId"
                  value={puntoId}
                  label="Punto"
                  onChange={handleChangePunto}
                >
                  {
                      puntosList.map(({_id, direccion}: any)=> <MenuItem value={_id} key={_id}>{direccion}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid> 
          }
          {/* {
            puntosList &&puntosList.length===0
            &&<p>este usuario no tiene Puntos</p>
          } */}
           <Button variant="contained" onClick={()=>saveData()}> Guardar </Button>
      </AlertDialog> 
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
    </TableContainer>
  )
}

