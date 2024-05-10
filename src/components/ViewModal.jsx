"use client"
import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,


  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ViewModal({openModal, onCloseModal, items}) {


  return (
    <div>

      <Modal
        open={openModal}
        onClose={()=>{onCloseModal()}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <h1 className=' text-center font-home text-xl font-semibold mb-4'>Supplier Details</h1>
          <div >
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Name:</p> {items.name}</div>
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Email:</p> {items.email}</div>
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Owner Name:</p> {items.owner_name}</div>
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Company Name:</p> {items.company_name}</div>
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Business Name:</p> {items.business_name}</div>
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Registration Number:</p>{items.registration_number}</div>
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Website:</p>{items.website}</div>
            <div className=' flex font-home text-xl'> <p className=' font-semibold mr-2'>Tax Document:</p>{items.tax_image}</div>
       </div>
        </Box>
      </Modal>
    </div>
  );
}