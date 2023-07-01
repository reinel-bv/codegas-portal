'use client' 
import { useEffect, useState } from 'react';
import { TableRow, TableCell, Checkbox, FormControl, InputLabel, InputAdornment, OutlinedInput, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {Snack} from "../components/snackBar"
import {ChangeValorUnitario, ChangeValorUnitarioAll, ChangeValorUnitarioSelected} from "../store/fetch-zona"
import { PaginationTable } from "../components/pagination/pagination";
import InputZones from '../components/input_zones/input_zones';

const RenderZonas = ({zona, updateValor, addValues}: any) => {
  return ( 
    zona.map(({_id, codt, razon_social, nombrezona, nombre, valorunitario, idcliente, isCheked}: any, index: any)=> {
    return (
      <TableRow
        key={index}
      >
        <TableCell component="th" scope="row" align="center">
          <Checkbox
            checked={isCheked}
            onChange={(e)=>addValues(idcliente, valorunitario, e)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </TableCell>
        <TableCell align="center" component="th">{nombrezona}</TableCell>
        <TableCell align="center">{codt}</TableCell>
        <TableCell align="center">{razon_social}</TableCell>
        <TableCell align="center">{nombre}</TableCell>
        <TableCell align="center">
          <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={_id.toString()}>Valor Uni</InputLabel>
          <OutlinedInput
            id={_id.toString()}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={valorunitario}
            onKeyPress={(e)=>{updateValor(e, idcliente, nombre)}}
          />
          </FormControl>
        </TableCell>
      </TableRow>
    )})
  )
}
export default function RenderTable({zona}: any) {
  const [showSnack, setShowSnack] = useState(false);
  const [isCheked, setIsCheked] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [valorWithArray, setValorWithArray] = useState<{ _id: any; valorunitario: number; }[]>([]);
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const newValue = searchParams.get('newValue');


  const [newValorUnitario, setNewValorUnitario] = useState({})
  const [newZona, setNewZona] = useState(zona)

  useEffect(() => {
    setNewZona(zona)
  }, [zona, newValue])
  useEffect(() => {
    const {valor: value, replace, typeValue: type, allUsers}: any = newValorUnitario
    const typeValue = replace==0 ?value :replace
    const data = valorWithArray.map(({_id, valorunitario}: any)=>{
      const newValue = type==="porcentaje" || type==undefined ? valorunitario +((valorunitario*Number(value))/100) : valorunitario+Number(value)
      const valorUnitario = replace==0 ?Math.round(parseFloat(newValue)) :Number(replace)
      return {
        _id,
        valorUnitario
      }
    })
 
    if( value || replace|| type) saveData(data, allUsers, type, typeValue)
  }, [newValorUnitario])

  const saveData = async (data: any, allUsers: boolean, type: string, replaceParams: any) => {
    let status;
    if(allUsers) {
      const response =  await ChangeValorUnitarioAll(replaceParams, type)
      status= response.status
    }
    if(!allUsers){
      const response =  await ChangeValorUnitarioSelected(data)
      status= response.status
    }
 
    if (status) {
      setShowSnack(true)
      setMessage("Valor Unitario actualizado")
      setSeverity('success')
      setValorWithArray([])
      setIsCheked(false)
      router.push(`${pathname}?page=${page}&newValue=${replaceParams}`, undefined)
    }
  }

  const addValuesAll = async (event: any) => {
    const data = newZona.map((e: any)=>{
      return{
        ...e,
        _id: e.idcliente,
        isCheked: event.target.checked  
      }
    })
    console.log(valorWithArray)
    if(event.target.checked) {setValorWithArray(data), setIsCheked(true)}
    if(!event.target.checked) {setValorWithArray([]), setIsCheked(false)}
    setNewZona(data)
  }
  const updateValor = async (event: any, idcliente: any, nombre: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const {status} = await ChangeValorUnitario(Number(event.target.value), idcliente)
      if (status) {
        setShowSnack(true)
        setMessage(`Valor Unitario Actualizado al cliente: ${nombre}`)
        setSeverity('success')
        
      }
    }
  }
  const addValues = (id: any, valorunitario: number, event: any) => {
 
    const index = valorWithArray.some(({ _id }) => _id === id);
    if (!index) {
      setValorWithArray((state) => [...state, {_id: id, valorunitario}])
    }else{
      setValorWithArray(valorWithArray.filter(({_id})=> {return _id !== id})) 
    }
   
    // const updateZona= newZona.map((e): any=>{if(e._id===id) return {...e, isCheked: event.target.checked} })
    // setNewZona()
  } 
  const validateIfIsSelectd = (e: any) => {
    if(e.allUsers){
      setNewValorUnitario(e)
    } else {
      if(valorWithArray.length===0){
        setShowSnack(true)
        setMessage("Selecciona al menos una fila!!!")
        setSeverity('error')
      }else{
        setNewValorUnitario(e)
      }
    }
      
  }

  return(
    <TableContainer component={Paper}>
      <InputZones onSend={validateIfIsSelectd} />
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
              <TableCell align="center">Zona</TableCell>
              <TableCell align="center">Codt</TableCell>
              <TableCell align="center">Razon Social</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Valor Unitario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <RenderZonas 
            zona={newZona} 
            updateValor={updateValor} 
            addValues={addValues} 
          />
        </TableBody>
      </Table>
      <PaginationTable total={zona[0]?.total ??0} />
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} severity={severity} />
    </TableContainer>
  )
}

