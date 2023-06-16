'use client' 
import { Fragment, useState } from 'react';
import { TableRow, TableCell, Box, Collapse, Button, Checkbox, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import moment from "moment"
import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import {SelectState} from "../components/selecState"
import {colors} from "../utils/colors"
import { PaginationTable } from "../components/pagination/pagination";
 

const {espera, noentregado, innactivo, activo, asignado, otro} = colors

const RenderTanques = ({_id, codt, razon_social, cedula, direccion, creado, fechasolicitud, 
  fechaentrega, forma, kilos, valorunitario, placa, novedades, estado, entregado, imagencerrar}: any) => {
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [newEstado, setNewEstado] = useState(estado)
  const [newFechaEntrega, setFechaEntrega] = useState(fechaentrega)
  const background=newEstado=="espera" ?espera :newEstado=="noentregado" ?noentregado :newEstado=="innactivo" ?innactivo :newEstado=="activo" &&!placa && !entregado ?activo :newEstado=="activo" && !entregado ?asignado :otro
  return (
    <Fragment> 
      <TableRow
            key={_id}
            sx={{ 
              background
            }}
          >
            <TableCell align="center">
              <Checkbox
                // onChange={()=>addValues(_id, fechaentrega)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </TableCell>
            <TableCell align="center">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </TableCell>
            <TableCell align="center" component="th">{_id}</TableCell>
            <TableCell align="center">{codt}</TableCell>
            <TableCell align="center">{razon_social}</TableCell>
            <TableCell align="center">
              {/* {
                newFechaEntrega 
                ?moment(newFechaEntrega).format('YYYY-MM-DD')
                :<Date setValueDate={(e: any) =>{ updateDate(_id, e), setFechaEntrega(e)}} />
              } */}
            </TableCell>
            <TableCell align="center">
              {/* <SelectState newEstado={newEstado} setNewEstado={(e: any)=>{setNewEstado(e), updateStatus(_id, e)}} /> */}
            </TableCell>
            <TableCell align="center">
              <Button variant="contained">
                {/* <Link href={`pedidos/${_id}/${moment(newFechaEntrega).format('YYYY-MM-DD')}`} style={{color: "#ffffff", textDecoration: 'none'}}>
                  {placa ?placa :"Sin Placa"}
                </Link> */}
              </Button>
            </TableCell>
            <TableCell align="center">
              {novedades &&<Button variant="contained">Si</Button>}
            </TableCell>
            <TableCell align="center">
              {/* {imagencerrar &&<Button variant="contained" onClick={()=>{setShowDialog(true), setImagenCerrar(imagencerrar)}}>Si</Button>} */}
            </TableCell>
          </TableRow>
      {/* <TableRow>
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
      </TableRow> */}
    </Fragment>
  )
}

export default function RenderTable({tanques}: any) {
  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">N pedido</TableCell>
              <TableCell align="center">Codt</TableCell>
              <TableCell align="center">Razon Social</TableCell>
              <TableCell align="center">F Entrega</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Placa</TableCell>
              <TableCell align="center">Obervacion</TableCell>
              <TableCell align="center">Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            tanques.map((e: any, key: string)=> (<RenderTanques {...e} key={key} /> ))
          }
          
        </TableBody>
      </Table>
      <PaginationTable total={tanques[0]?.total ?? 0} />
    </TableContainer>
  )
}

