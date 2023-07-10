import React from 'react';
import {
  Box,
  Container,
  Grid,  
} from '@mui/material';
import Image from 'next/image'
import { AlertDialog } from '../components/alertDialog/alertDialog';
import ModalImage from "react-modal-image";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const RenderInfo = ({text, data}: any) => {
  return (
    <>
      <h3>{text}</h3>
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
            {/* <Image 
              src={image} 
              alt={`Image ${index}`} 
              width={150}
              height={155}
              placeholder="blur"
              blurDataURL={image}
            /> */}
             <ModalImage
              small={image}
              large={image}
              style={{height:100}}
              alt={`Image ${index}`} 
            />
            
          </Box>
        </Box>
      ))
    }
  </>
  )
}

function RenderAlert({data}: any) {
  return (
    <>
      {
        data.map(({texto}:any, index: any)=> {
          return <ListItem key={index} component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={texto} />
            </ListItemButton>
          </ListItem>
        })
      }
    </>
  );
}

export function Detail({ showDialog, tanque, setShowDialog }: { showDialog: any; tanque: any, setShowDialog: any }) {
  const {placa, placamantenimiento, placafabricante, dossier, cerfabricante, ceronac, visual, data=[]} = tanque

  return (
    <Container component="main" maxWidth="xl">
      <AlertDialog showDialog={showDialog} setShowDialog={() => setShowDialog(false)}>
        <Box>
        {
          data.length==0
          ?<Grid container spacing={2}>
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
          :<RenderAlert data={data} />          
        }
          
        </Box>
      </AlertDialog>
     
    </Container>
  );
}
