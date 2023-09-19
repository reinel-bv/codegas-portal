import {getUsers} from '../store/fetch-user' 
import {getPuntos} from '../store/fetch-punto'
import CrearPedido from './create-pedido'
import type {RenderPedidoProps} from "./crear-pedido.types"

export const RenderCrearPedido = async function RenderCrearPedido({page, limit, access, search, idUser, usuarioCrea}: RenderPedidoProps) {
  const user = await getUsers(page, limit, access, usuarioCrea, search);
  let puntos = {puntos: null}
  if(idUser){
    puntos = await getPuntos(idUser, '1');
  }
  return <CrearPedido user={user} puntos={puntos.puntos}  />;
}  
