import React, { useState } from 'react';
import {
    HiOutlineMail,
    HiOutlineUser,
    HiOutlineIdentification,
    HiOutlinePhone,
    HiOutlineCalendar } from 'react-icons/hi';
import { IoMdTime } from 'react-icons/io';
import { Alert } from '@mui/material';
import Spinner from '../../Spinner';


export default function index({attendedAppoint}) {

  return (
    <div>
         {attendedAppoint.length > 0 ? (
              <div>{attendedAppoint.map((att) => (
                <div key={att.id} className='p-2 rounded shadow mb-3' style={{background: "#fff"}}>
                  <p className='lh-lg fs-6'><HiOutlineUser/>{att.name} <HiOutlineMail/> {att.email} <br/>
                  <HiOutlineIdentification/> {att.nrc} <HiOutlinePhone/> {att.phone} <br/><Alert severity='success'>Attended</Alert></p>
                  <p><IoMdTime/> {att.time}   <HiOutlineCalendar/> {att.date}</p>
                </div>
              ))}</div>
            ):(
              <Alert severity='error' className='p-5 shadow'>
                Unfortunately, you do not have any attended Appointments
              </Alert>
            )}
    </div>
  )
}
