'use client';
import React, { ReactElement, useState } from 'react';
import { MenuItem, Select, Button, Grid, InputBase, FormControlLabel, Checkbox } from '@mui/material';

import { InputZonaProps } from "./input_zona_props";
import PaperContent from "../paperContent/paper_content";

 

const InputZones = ({ onSend }: { onSend: (data: InputZonaProps) => void }): ReactElement => {
  const [data, setData] = useState<InputZonaProps>({ typeValue: 'porcentaje', replace: 0, valor: 0, allUsers: false });

  const handleChange = (prop: keyof InputZonaProps, event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
    if (prop==='allUsers') {
      const inputElement = event?.target as HTMLInputElement;
      setData({ ...data, [prop]: inputElement?.checked });
    }
    else setData({ ...data, [prop]: prop==='typeValue' ?event.target.value :Number(event.target.value) });
  
  }

  return (
    <div>
      <Grid container spacing={2}>
        <PaperContent>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="reemplazar valor unitario ..."
            onChange={(e) => handleChange('replace', e)}
          />
        </PaperContent>
        <Grid item xs={12} sm={2}>
          <Select
            labelId="typeValue"
            id="typeValue"
            value={data?.typeValue || 'porcentaje'}
            onChange={(e: any) => handleChange('typeValue', e)}
            label="typeValue"
            sx={{ marginLeft: 1, marginTop: 2, p: '0px', display: 'flex', alignItems: 'center', width: "100%" }}
          >
            <MenuItem value="porcentaje">Porcentaje</MenuItem>
            <MenuItem value="adicion">Adición</MenuItem>
          </Select>
        </Grid>
        <PaperContent>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={data?.typeValue === "porcentaje" ? "% valor en porcentaje" : "$ valor a sumar o restar"}
            onChange={(e) => handleChange('valor', e)}
          />
        </PaperContent> 
        <Grid item xs={12} sm={2} sx={{ marginTop: 3 }}>
          <FormControlLabel control={
            <Checkbox onChange={(e: any) => handleChange('allUsers', e)} />
            } 
            label="Todos los usuarios" 
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            sx={{ marginTop: 2, p: '12px 12px' }}
            onClick={() => onSend(data)}
          >
            Guardar
          </Button>
        </Grid>
       
      </Grid>
    </div>
  );
}

export default InputZones;
