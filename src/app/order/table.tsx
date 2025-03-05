'use client' 
import { Fragment, useState, useEffect } from 'react';
import { TableRow, TableCell, Box, Collapse, Button, Checkbox, Table, TableBody, TableContainer, TableHead, Typography, Grid, Paper, FormControl, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import moment from "moment"
import dayjs from 'dayjs';
import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {SelectState} from "../components/selecState"
import {colors} from "../utils/colors"
import { PaginationTable } from "../components/pagination/pagination";
import {UpdateDatePedido, UpdateStatePedido, sendNovedad, resetPedido} from "../store/fetch-pedido"
import {Date} from "../components/date"
import {Snack} from "../components/snackBar"
import {AlertDialog} from "../components/alertDialog/alertDialog"
import Image from "next/image"
import AlertConfirm from '../components/alertConfirm/alertConfirm';
const {espera, noentregado, innactivo, activo, asignado, otro} = colors




const RenderTanques = ({_id, codt, razon_social, cedula, direccion, creado, fechasolicitud, isCheked,
  fechaentrega, forma, kilos, valorunitario, placa, observacion_pedido, estado, entregado, imagencerrar, addValues, zona, updateDate, updateStatus, setOpenConfirm}: any) => {
  
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const background=estado=="espera" ?espera :estado=="noentregado" ?noentregado :estado=="innactivo" ?innactivo :estado=="activo" &&!placa && !entregado ?activo :estado=="activo" && !entregado ?asignado :otro
    console.log(fechaentrega)
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
                checked={isCheked  ?isCheked :false}
                onChange={(e)=>addValues(_id, e)}
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
            <TableCell align="center">{direccion}</TableCell>
            <TableCell align="center">{zona}</TableCell>
            <TableCell align="center">{fechasolicitud}</TableCell>
            <TableCell align="center">
              <Date setValueDate={(e: any) =>updateDate(e, _id)} value={fechaentrega} />
            </TableCell>
            <TableCell align="center">
              <SelectState newEstado={estado} setNewEstado={(e: any)=>updateStatus(e, _id)} />
            </TableCell>
            <TableCell align="center">
              <Button variant="contained">
                <Link href={`carros?placa=${_id}&date=${fechaentrega ?moment(fechaentrega).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}`} style={{color: "#2df7ff", textDecoration: 'none'}}>
                  {placa ?placa :"Asignar"}
                </Link>
              </Button>
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
                          
                          <TableCell align="center">Solicitud</TableCell>
                          <TableCell align="center">Kilos</TableCell>
                          <TableCell align="center">Valor</TableCell>
                          <TableCell align="center">Cedula</TableCell>
                          <TableCell align="center">F. Creación</TableCell>
                          <TableCell align="center">Obervación</TableCell>
                          <TableCell align="center">Remision</TableCell>
                          <TableCell align="center">&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                         
                          <TableCell align="center">{forma}</TableCell>
                          <TableCell align="center">{kilos}</TableCell>
                          <TableCell align="center">{valorunitario}</TableCell>
                          <TableCell align="center">{cedula}</TableCell>
                          <TableCell align="center">{moment(creado).format('YYYY-MM-DD HH:mm')}</TableCell>
                          <TableCell align="center">
                            {observacion_pedido}
                          </TableCell>
                          <TableCell align="center">
                            {imagencerrar &&<Button variant="contained" onClick={()=>setShowDialog(true)}>Si</Button>}
                          </TableCell>
                          <TableCell align="center">
                            {<Button variant="contained" onClick={()=>setOpenConfirm(_id)}>Restaurar</Button>}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
         
          
          <AlertDialog showDialog={showDialog} setShowDialog={()=>setShowDialog(false)}>
            {imagencerrar &&<Image src={imagencerrar} alt="codegas colombia" width={320} height={520}/> }
          </AlertDialog>

    </Fragment>
  )
}

export default function RenderTable({orders}: any) {
  console.log(orders)
  const [valorWithArray, setValorWithArray] = useState<{ _id: any }[]>([]);
  const [newValorWithArray, setNewValorWithArray] = useState<string | undefined>();
  const [isCheked, setIsCheked] = useState(false);
  const [newOrder, setNewOrder] = useState(orders)
  const [showSnack, setShowSnack] = useState(false);
  const [showDialogInnactivo, setShowDialogInnactivo] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [pedidoId, setPedidoId] = useState("");

  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const newValue = searchParams.get('newValue');
  const idUser = searchParams.get('idUser');
  const acceso = searchParams.get('acceso');
  let search = searchParams.get('search');
  search = search || 'undefined'


  useEffect(()=> {
    let data = ''
    for(let i=0; i<valorWithArray.length; i ++){
      data += valorWithArray[i]._id
      data += ','
    }
    setNewValorWithArray(data)
  }, [valorWithArray])

  useEffect(() => {
    setNewOrder(orders)
  }, [orders, newValue])


  const addValues = (id: any, event: any) => {
    const index = valorWithArray.some(({ _id }) => _id === id);
    if (!index) {
      setValorWithArray((state) => [...state,{ _id: id}]);
    } else {
      setValorWithArray(valorWithArray.filter(({ _id }) => _id !== id));
    }

    const updateOrder = newOrder.map((e: { _id: any; }) => {
      if (e._id === id) {
        return { ...e, isCheked: event.target.checked };
      }
      return e;
    });
  
    setNewOrder(updateOrder);
 
  };

  const addValuesAll = async (event: any) => {
    const data = newOrder.map((e: any)=>{
      return{
        ...e,
        _id: e._id,
        isCheked: event.target.checked
      }
    })
    
    if(event.target.checked) {setValorWithArray(data), setIsCheked(true)}
    if(!event.target.checked) {setValorWithArray([]), setIsCheked(false)}
    setNewOrder(data)
  }
  const updateDate = async (date: any, id?: any) => {
    let dataToSend = valorWithArray.map((e: { _id: any; }) => {
      return {
        ...e,
        fechaentrega: dayjs(date).format('YYYY-MM-DD'),
      }
    })
 

    if(id){
      dataToSend = [{_id:id, fechaentrega: dayjs(date).format('YYYY-MM-DD')}] 
    } else {
      dataToSend = dataToSend
      setIsCheked(false)
      setValorWithArray([])
      
    }
    
    const {status} = await UpdateDatePedido(dataToSend)
    if (status) {
      setShowSnack(true)
      setMessage("Fecha Actualizada")
      router.push(`${pathname}?page=${page}&search=${search}&idUser=${idUser}&acceso=${acceso}&newValue=${id+dayjs(date).format('YYYY-MM-DD')}`, undefined)
    }
  }
  const updateStatus = async (state: any, id?: any) => {
    let data = valorWithArray.map((e: { _id: any; }) => {
      return {
        ...e,
        estado: state,
      }
    })

    if(id){
      data =  [{_id:id, estado: state}] 
     
    } else {
      data = data
      setIsCheked(false)
      setValorWithArray([])
    }
    
    const {status} = await UpdateStatePedido(data)
    if (status) {
      setShowSnack(true)
      setMessage(`estado ${state} cambiado!`)
      router.push(`${pathname}?page=${page}&search=${search}&idUser=${idUser}&acceso=${acceso}&newValue=${id+state}`, undefined)
    }
    if(state=='innactivo'){
      setShowDialogInnactivo(true)
      setPedidoId(id)
    }
  }
  const sendNovedadInnactivo = async(event: any) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      novedad: form.get('novedad'),
      pedidoId,
    };

    const {status} = await sendNovedad(data)
    if (status) {
      setShowSnack(true)
      setMessage(`Novedad enviada!`)
      setShowDialogInnactivo(false)
      setPedidoId('')
    }
  }
  const resetOrder = async() => {
    const {status} = await resetPedido(pedidoId)
    if (status) {
      setShowSnack(true)
      setMessage(`Pedido Reseteado!`)
      setOpenConfirm(false)
      setPedidoId('')
      router.push(`${pathname}?page=${page}&search=${search}&idUser=${idUser}&acceso=${acceso}&newValue=${pedidoId+200}`, undefined)
    }
  }

  
  return(
    <TableContainer component={Paper}>
      {
        valorWithArray.length>0
        &&<Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={1}>
              <Button variant="contained" sx={{ marginTop: 1, marginLeft: 1, padding: 2, width: "100%" }}>
                <Link 
                  href={`carros?placa=${newValorWithArray}&date=${moment().format('YYYY-MM-DD')}`} 
                  style={{
                    color: "#ffffff", 
                    textDecoration: 'none'
                  }}
                >
                  Vehiculos
                </Link>
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Date setValueDate={updateDate} />
            </Grid>
            <Grid item xs={12} sm={2}  sx={{ marginTop: 1 }} >
              <SelectState setNewEstado={updateStatus}/>
            </Grid>
          </Grid>
      }
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell align="center">
                <Checkbox
                  checked={isCheked}
                  onChange={addValuesAll}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">N pedido</TableCell>
              <TableCell align="center">Codt</TableCell>
              <TableCell align="center">Razon Social</TableCell>
              <TableCell align="center">Direccion</TableCell>
              <TableCell align="center">Zona</TableCell>
              <TableCell align="center">F. Solicitud</TableCell>
              <TableCell align="center">F Entrega</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Placa</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {
            newOrder.map((e: any, key: string)=> (
              <RenderTanques {...e} 
                key={key} 
                addValues={addValues} 
                updateDate={updateDate}
                updateStatus={updateStatus}
                setOpenConfirm={(id: any)=>{setOpenConfirm(true), setPedidoId(id)}}
              /> 
            ))
          }
          
        </TableBody>
      </Table>
      <PaginationTable total={newOrder[0]?.total ?? 0} />
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
       <AlertDialog showDialog={showDialogInnactivo} setShowDialog={() => setShowDialogInnactivo(false)}>
        <Box component="form" noValidate onSubmit={sendNovedadInnactivo}>
          <Grid item xs={12} sm={12}>
            <FormControl sx={{ width: 500 }}>
              <TextField id="novedad" label="Novedad" name="novedad" multiline rows={4} />
            </FormControl>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Guardar
          </Button>
        </Box>
      </AlertDialog>
      <AlertConfirm 
        openConfirm={openConfirm} 
        handleConfirm={()=>resetOrder()} 
        handleClose={()=>setOpenConfirm(false)} 
        title={`Seguro desea resetear el pedido ${pedidoId}?`} 
      />
    </TableContainer>
  )
}
