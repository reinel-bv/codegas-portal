import {fetchZonasByUser} from '../store/fetch-zona' 
import RenderTable from './table'

export const RenderZonasUsers = async function RenderZonasUsers({limit, page, idZone, type, search, newValue}: any) {
  const zona = await fetchZonasByUser(limit, page, idZone, type, search, newValue);

  return <RenderTable zona={zona} />;
}