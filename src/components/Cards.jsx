import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';

export default function Cards({name,para,onclick}) {
  return (
    <Card  sx={{ display: 'flex', width:'20%', boxShadow:3, cursor:'pointer' }}  onClick={onclick}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
     
        <h1 className=' text-2xl font-home  font-semibold' >
         {name}
        </h1>
        <p className=' font-home text-lg text-gray-500 '>
        {para}
        </p>
      </CardContent>
    </Box>
  </Card>
  )
}
