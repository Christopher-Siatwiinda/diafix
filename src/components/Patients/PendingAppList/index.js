import React, { useState } from 'react';
import {
    HiOutlineMail,
    HiOutlineUser,
    HiOutlineIdentification,
    HiOutlinePhone,
    HiOutlineCalendar } from 'react-icons/hi';
import { IoMdTime } from 'react-icons/io';
import { Alert } from '@mui/material';

export default function Index({newAppoint}) {
  return (
    <div>
        {newAppoint.length > 0 ? (<div>{newAppoint.map((app)=>(
              <div key={app.id} className='p-2 rounded shadow mb-3' style={{background: "#fff"}}>
              <p className='lh-lg fs-6'><HiOutlineUser/> {app.name} <HiOutlineMail/> {app.email}  
              <HiOutlineIdentification/> {app.nrc} <HiOutlinePhone/> {app.phone} </p>
              <p style={{paddingTop: 0}}> <IoMdTime/> {app.time}    <HiOutlineCalendar/> {app.date}</p>
              <div className='d-flex justify-content-end'><button style={{
              borderStyle: 'none', 
              marginTop: 10+"px", 
              paddingTop: 5+"px",
              paddingRight: 35+'px',
              paddingLeft: 35+'px',
              paddingBottom: 5+'px'
              }}>attended</button></div>
            </div>
            ))} </div>) : (
              <Alert severity='error' className='p-5 shadow'>
                Unfortunately, you do not have any new Appointments
              </Alert>
            )} 
    </div>
  )
}
