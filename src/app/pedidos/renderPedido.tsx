import {fetchPedido} from '../store/fetch-pedido' 
import RenderTable from './table'
export const RenderPedidos = async function RenderPedidos({page, search, idUser, acceso}: any) {
  const pedido = await fetchPedido(idUser, page, search, acceso, 10); 
  return <RenderTable data={pedido} />;
}
