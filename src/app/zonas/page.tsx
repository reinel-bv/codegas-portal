'use cliente'
import React, { ReactElement } from 'react';
import { RenderZonasUsers } from './renderZonasUsers'; 
import InputSearch from "../components/search/search"

const limit=10
const idZone=110
const type='BySearch'
const Zona = ({searchParams}: any): ReactElement => {
  let {page, search, newValue} = searchParams
  page = page || 0

  return (
    <>
      <InputSearch search={search} />
      {RenderZonasUsers({limit, search, page, idZone, type, newValue})}
    </>
  )
}

export default Zona
 