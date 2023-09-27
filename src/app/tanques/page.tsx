'use cliente'
import React, { ReactElement } from 'react';

import { RenderTanques } from './renderTanques'; 
import InputSearch from "../components/search/search"

const ACCESS = 'clientes'
const LIMIT = 10

const Tanque = ({searchParams}: any): ReactElement => {
  let {page, search, idUser: usuarioCrea, searchUser} = searchParams
  page = page || 0

  return (
    <>
      <InputSearch search={search} />
      {RenderTanques({search, page, usuarioCrea, searchUser, limit: LIMIT, access: ACCESS})} 
    </>
  )
}

export default Tanque
 