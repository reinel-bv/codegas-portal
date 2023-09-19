import { getUsers } from '../store/fetch-user';
import { fetchZonas } from '../store/fetch-zona';
import {getPuntos} from '../store/fetch-punto'

import SelectUser from './SelectUser';
import type {RenderUsersProps} from "./crear-usuario.types"

export const RenderUsers = async function RenderUsers({
  page,
  limit,
  access,
  search,
  userId,
  step
}: RenderUsersProps) {
  const user = await getUsers(page, limit, access, userId, search);
  const zona = await fetchZonas();
  let puntos = {puntos: []}
  if(userId){
    puntos = await getPuntos(userId, step);
  }

  return <SelectUser data={user} zona={zona} userId={userId} puntos={puntos?.puntos} />;
}
