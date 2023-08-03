import React, { useEffect, useState } from 'react';
import TotalAppointments from '../../components/Patients/TotalAppointments';
import AttendedAppointments from '../../components/Patients/AttendedAppointments';
import PendingAppointments from '../../components/Patients/PendingAppointments';
import { CiUser } from 'react-icons/ci';
import {
   HiOutlineMail,
   HiOutlineUser,
   HiOutlineIdentification,
   HiOutlinePhone,
   HiOutlineCalendar } from 'react-icons/hi';
import { IoMdTime } from 'react-icons/io'
import { Alert } from '@mui/material';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function Index() {
  const { currentUser } = useAuth();
  const [newAppoint, setNewAppoint] = useState([]);
  const [attendedAppoint, setAttendedAppoint] = useState([]);

  useEffect(() =>{
    const allApp = async () => {
      if(currentUser){
        const getApp = query(
          collection(db, `DiaFixDoctor/${currentUser.uid}/Appointments`),
          where('attended', "==", "false")
        );
  
        const getAttended = query(
          collection(db, `DiaFixDoctor/${currentUser.uid}/Appointments`),
          where('attended', "==", "true")
        );
  
        const newApp = await getDocs(getApp);
        const attendedApp = await getDocs(getAttended);
  
        setNewAppoint(newApp.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setAttendedAppoint(attendedApp.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
    }

    allApp();
  })
  return (
    <div>
        <div className='mb-3 row'>
                <div className='col-lg-3 col-md-4 col-sm-auto'>
                  {currentUser && (
                    <TotalAppointments currentUser={currentUser.uid}/>
                  )}
                  
                </div>
                <div className='col-lg-3 col-md-4 col-sm-auto'>
                  {currentUser && (
                    <AttendedAppointments currentUser={currentUser.uid}/>
                  )}
                  
                </div>
                <div className='col-lg-3 col-md-4 col-sm-auto'>
                  {currentUser && (
                    <PendingAppointments currentUser={currentUser.uid}/>
                  )}
                </div>
            </div>
            <div style={{background: "#fff", paddingLeft: 10+"px"}} className="shadow d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom rounded">
            <h1 class="h6 bold">Appointments</h1>
            </div>

            
          <div>
            <h6 className='ms-2 mt-4'>New Appointments</h6>
            {newAppoint.length > 0 ? (<div>{newAppoint.map((app)=>(
              <div className='p-2 rounded shadow mb-3' style={{background: "#fff"}}>
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
          <div>
            <h6 className='ms-2 mt-4'>Attended Appointments</h6>
            {attendedAppoint.length > 0 ? (
              <div>{attendedAppoint.map((att) => (
                <div className='p-2 rounded shadow mb-3' style={{background: "#fff"}}>
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
    </div>
  )
}
