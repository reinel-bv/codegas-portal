'use client' 
import React from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const Date = ({value, setValueDate, label}: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DemoItem label={label} >
                <DatePicker value={dayjs(value) || dayjs('2020-04-17')} format="YYYY-MM-DD" onChange={(newValue) => setValueDate(newValue)} 
                    sx={{ 
                        width: "100%"
                    }}
                />
            </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    )
}