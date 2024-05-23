'use client' 
import React, {useEffect} from 'react';
import {Pagination, Stack } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function PaginationTable({total}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const idUser = searchParams.get('idUser');
  const acceso = searchParams.get('acceso');
  let page = searchParams.get('page')
  page = page == "0" ? "1" : page;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if(pathname==="/order"){
      router.push(`${pathname}?page=${value}&idUser=${idUser}&search=${search ?? undefined}&acceso=${acceso}`);
    } else {
      router.push(`${pathname}?page=${value}&search=${search ?? undefined}`);
    }
  };
  useEffect(()=>{
    if(pathname==="/order"){
      router.push(`${pathname}?page=0&idUser=${idUser}&acceso=${acceso}`);
    } else {
      router.push(`${pathname}?page=0&search=${search ?? undefined}`);
    }
  }, [])

  return (
    <Stack spacing={2} sx={{padding: 3}}>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={Math.ceil(total/10)}
        page={Number(page)}
        showFirstButton
        showLastButton
        onChange={handleChange} 
      />
    </Stack>
  );
}