import {fetchPedido} from '../store/fetch-pedido'
import RenderTable from './table'

export const RenderOrder = async function RenderOrder({idUser, acceso, limit, page, search, newValue}: any) {
  let order = await fetchPedido(idUser, page, search, acceso, limit, newValue);
  
  return <RenderTable orders={order} />;
}  