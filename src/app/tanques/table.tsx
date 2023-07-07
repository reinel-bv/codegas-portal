'use client' 
import { Fragment, useState } from 'react';
import { TableRow, TableCell, Box, Collapse, Button, Typography, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
 
import { PaginationTable } from "../components/pagination/pagination";
import {Detail} from "./detail"
const RenderTanques = ({_id, codigoactivo, capacidad, fabricante, registroonac, fechaUltimaRev: fechaMto, nplaca: placaMan, serie, anofabricacion, existeTanque: ubicacion, ultimrevtotal, propiedad, direccion, razon_social, codt, data, handleDialog}: any) => {
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
                      <TableCell align="center">{razon_social}</TableCell>
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

export default function RenderTable({tanques}: any) {
  const [showDialog, setShowDialog] = useState(false);
  const [tanque, setTanque] = useState({});
  const handleDialog = (id: any) => {
    setShowDialog(true)
    const filterTanque = tanques.filter(({_id}: any) => {return id===_id})
    setTanque(filterTanque[0])
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
            tanques.map((e: any, key: string)=> (<RenderTanques {...e} key={key} handleDialog={handleDialog} /> ))
          }
          
        </TableBody>
      </Table>
      <PaginationTable total={tanques[0]?.total ?? 0} />
      <Detail showDialog={showDialog} setShowDialog={setShowDialog} tanque={tanque} />
    </TableContainer>
  )
}

