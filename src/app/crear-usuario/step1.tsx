'use client'
import React, {useState, useContext, useEffect} from 'react';
import { Box, Button, FormControl, Container, CssBaseline, InputLabel, Grid, MenuItem, Select, TextField, SelectChangeEvent} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import {Snack} from "../components/snackBar"
import {accesos, fields, tipos} from "../utils/users_info"
import {createUser, editUser, getUserById} from "../store/fetch-user"
import {DataContext} from '../context/context'
import { generate } from '@wcj/generate-password';


const GENERATE_PASS = generate()
export default function Step1({data, userId, setActiveStep}: any) {
  const {createUserFirebase}: any = useContext(DataContext)
 
  const [idPadre, setIdPadre] = useState('');
  const router = useRouter();
  const pathname = usePathname()
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [newAcceso, setNewAcceso] = useState('')
  const [newTipo, setTipo] = useState('')
  const [userInfo, setUserInfo] = useState({
    email:null,
    cedula: null,
    nombre: null,
    celular: null,
    acceso: null,
    idpadre: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const {user} = await getUserById(userId);
     
      setUserInfo(user)
      setNewAcceso(user.acceso)
      setTipo(user.tipo)
    };
    userId &&fetchData();
  }, []);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setIdPadre(event.target.value as string);
  };

  const handleEdit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      email: data.get('email'),
      cedula: data.get('cedula'),
      nombre: data.get('nombre'),
      celular: data.get('celular'),
      codMagister: data.get('codMagister'),
      razon_social: data.get('razon_social'),
      direccion_factura: data.get('direccion_factura'),
      codt: data.get('codt'),
      valorUnitario: data.get('valorunitario'),
      acceso: data.get('acceso'),
      idPadre: idPadre,
      _id: userId
    };
    editUser(newData)
    setActiveStep();
  }
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    try {
      const response = await createUserFirebase(data.get('email'), GENERATE_PASS);
      if (typeof response === 'string') {
        setSeverity("error")
        setShowSnack(true)
        setMessage("Este email ya existe")
        console.log('Error:', response);
      } else {
        const newData = {
          email: data.get('email'),
          cedula: data.get('cedula'),
          nombre: data.get('nombre'),
          celular: data.get('celular'),
          codMagister: data.get('codMagister'),
          razon_social: data.get('razon_social'),
          direccion_factura: data.get('direccion_factura'),
          codt: data.get('codt'),
          valorUnitario: data.get('valorunitario'),
          acceso: data.get('acceso'),
          idPadre: idPadre,
          tipo: newTipo,
          uid: response.uid,
          pass: GENERATE_PASS
        };
        saveData(newData);
      }
    } catch (error) {
      console.error(error);
    }

  };
  const handleChange = (event: SelectChangeEvent) => {
    setNewAcceso(event.target.value as string);
  };
  const handleTipo = (event: SelectChangeEvent) => {
    setTipo(event.target.value as string);
  };
  const saveData = async (data: any) => {
    const {status, code} = await  createUser(data)
    if (status) {
      setShowSnack(true)
      setMessage("Usuario Guardado con exito")
      setSeverity("success")
      router.push(`${pathname}?userId=${code}`, undefined)
      setTimeout(() => {
        setActiveStep();
      }, 1000);
      
    }
  }

 
  return (
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
       
        <Box component="form" noValidate onSubmit={userId ?handleEdit :handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="acceso">Acceso</InputLabel>
                <Select
                  name="acceso"
                  labelId="acceso"
                  id="acceso"
                  value={newAcceso}
                  label="Acceso"
                  onChange={handleChange}
                >
                  {
                    accesos.map(({value, label})=> <MenuItem value={value} key={value}>{label}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            
            {
              fields.map(({label, value, acceso}, key)=> {
                if (acceso === 'all' || acceso === newAcceso) {
                  return <Grid item xs={12} key={key}>
                    <TextField
                      required
                      fullWidth
                      name={value}
                      label={label}
                      type={value}
                      id={value}
                      autoComplete={value}
                      InputLabelProps={{ shrink: true }}
                      defaultValue={userInfo?.email ?userInfo[value as keyof typeof userInfo] || '' :""}
                    />
                  </Grid>
                }
              })
            }
            {
              newAcceso==="cliente"
              &&<Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="tipo">Tipo</InputLabel>
                    <Select
                      name="tipo"
                      labelId="tipo"
                      id="tipo"
                      value={newTipo}
                      label="Tipo"
                      onChange={handleTipo}
                    >
                      {
                        tipos.map(({value, label})=> <MenuItem value={value} key={value}>{label}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </Grid>
            }
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  {!userInfo?.idpadre &&<InputLabel id="idPadre">Veo / Padre</InputLabel>}
                  <Select
                      labelId="idPadre"
                      id="idPadre" 
                      name="idPadre"
                      value={userInfo?.idpadre}
                      label="Padre"
                      onChange={handleChangeSelect}
                    >
                    {
                        data.map(({_id, nombre}: any)=> <MenuItem value={_id} key={_id}>{nombre}</MenuItem>)
                    }
                    </Select>
                </FormControl>
              </Grid> 
          
          </Grid>
          <Button
            type="submit"
            fullWidth
            // variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} severity={severity} />
    </Container>
  );
}