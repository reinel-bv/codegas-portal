'use client'
import React, { ReactElement, useContext } from 'react';
import { RenderTanques } from '../tanques/renderTanques'; 
import { Container, Grid, Box, Paper} from '@mui/material';
import InputSearch from "../components/search/search"
import {DataContext} from "../context/context"

const limit=10
const Pedidos = ({searchParams}: any): ReactElement => {
  let {page, search} = searchParams
  page = page || 0 
  const {idUser, acceso}: any = useContext(DataContext)

  return(
    <>
        <InputSearch search={search} />
        {RenderTanques({limit, search, page})} 
      
    </>
  )
}

export default Pedidos
 