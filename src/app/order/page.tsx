import React, { ReactElement } from 'react';

import { RenderOrder } from './RenderOrder'; 
import InputSearch from "../components/search/search"

const limit=10
const Order = ({searchParams}: any): ReactElement => {
  let {page, search, newValue, idUser, acceso} = searchParams
  page = page || 0

  return (
    <>
      <InputSearch search={search} />
      {
      idUser
      ?RenderOrder({idUser, acceso, limit, search, page, newValue})
      :null} 
    </>
  )
}

export default Order
 