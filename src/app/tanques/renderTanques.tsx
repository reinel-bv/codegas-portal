import {fetchTanques} from '../store/fetch-tanque'
import {getUsers} from '../store/fetch-user' 
import RenderTable from './table'

export const RenderTanques = async function RenderTanques({limit, page, search, searchUser, access, usuarioCrea}: any) {
  const user = await getUsers(page, limit, access, usuarioCrea, searchUser);
  const tanque = await fetchTanques(limit, page, search);

  return <RenderTable tanques={tanque}  users={user}  />;
}  