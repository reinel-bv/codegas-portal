import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
} from '@mui/material';
import Image from 'next/image'
import { AlertDialog } from '../components/alertDialog/alertDialog';
import DeleteIcon from '@mui/icons-material/Delete';
 
const RenderInfo = ({text, data}: any) => {
  return (
    <>
      <p>{text}</p>
      {
      data.map((image: any, index: any) => (
        <Box key={index} sx={{ display: 'inline-block', marginRight: '10px' }}>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              border: '1px solid #ccc',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '0px',
            }}
          >
            <Image 
              src={image} 
              alt={`Image ${index}`} 
              width={150}
              height={155}
              placeholder="blur"
              blurDataURL={image}
            />
            <IconButton
              sx={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: '#fff' }}
              onClick={() => console.log(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))
    }
  </>
  )
}

export function Detail({ showDialog, tanque, setShowDialog }: { showDialog: any; tanque: any, setShowDialog: any }) {
  const {placa, placamantenimiento, placafabricante, dossier, cerfabricante, ceronac, visual} = tanque
  console.log(placa)
  return (
    <Container component="main" maxWidth="xl">
      <AlertDialog showDialog={showDialog} setShowDialog={() => setShowDialog(false)}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              {
                placa &&placa.length>0
                &&<RenderInfo data={placa} text="Placa" />
              }{
                placamantenimiento &&placamantenimiento.length>0
                &&<RenderInfo data={placamantenimiento} text="Placa Mantenimiento" />
              }{
                placafabricante &&placafabricante.length>0
                &&<RenderInfo data={placafabricante} text="Placa Fabricante" />
              }{
                dossier &&dossier.length>0
                &&<RenderInfo data={dossier} text="Dossier" />
              }{
                cerfabricante &&cerfabricante.length>0
                &&<RenderInfo data={cerfabricante} text="Cert Fabricante" />
              }{
                ceronac &&ceronac.length>0
                &&<RenderInfo data={ceronac} text="Cert Onac" />
              }{
                visual &&visual.length>0
                &&<RenderInfo data={visual} text="Visual" />
              }   
            </Grid>
           
            
          </Grid>
        </Box>
      </AlertDialog>
   
    </Container>
  );
}
