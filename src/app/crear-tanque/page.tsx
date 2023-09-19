import React from 'react';
import {RenderCrearTanque} from "./renderTanque"

const ACCESS = 'clientes'
const LIMIT = 10

export default function Tanque({searchParams}: any) { 
    let {page, search, tanqueId, userId, usuarioCrea} = searchParams
    page = page || 0
    return RenderCrearTanque({userId, tanqueId, page, search, usuarioCrea, limit: LIMIT, access: ACCESS})
}
