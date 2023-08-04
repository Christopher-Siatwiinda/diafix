import React, { useEffect, useState } from 'react';
import TotalAppointments from '../../components/Patients/TotalAppointments';
import AttendedAppointments from '../../components/Patients/AttendedAppointments';
import PendingAppointments from '../../components/Patients/PendingAppointments';
import { CiUser } from 'react-icons/ci';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import AttendedAppList from '../../components/Patients/AttendedAppList';
import PenddingAppList from '../../components/Patients/PendingAppList';
import Pagination  from '../../components/Pagination';
import Pagination2  from '../../components/Pagination2';

export default function Index() {
  const { currentUser } = useAuth();
  const [newAppoint, setNewAppoint] = useState([]);
  const [attendedAppoint, setAttendedAppoint] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(1);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [appointmentsPerPage1] = useState(1);

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

  // pagination getting the current page.
      // first page
  const indexOfLastAppoint = currentPage * appointmentsPerPage;
  const indexOfFirstAppoint = indexOfLastAppoint - appointmentsPerPage;
     // second page
  const indexOfLastAppoint1 = currentPage1 * appointmentsPerPage1;
  const indexOfFirstAppoint1 = indexOfLastAppoint1 - appointmentsPerPage1;

  const currentAttApps = attendedAppoint.slice(indexOfFirstAppoint1, indexOfLastAppoint1);
  const currentPendingApps = newAppoint.slice(indexOfFirstAppoint, indexOfLastAppoint);
  
  // pagination change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const myPaginate = (pageNumber) => setCurrentPage1(pageNumber);

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
            {newAppoint && (
              <div>
                <div>
                  <PenddingAppList newAppoint={currentPendingApps}/>
                </div>
                <Pagination 
                  itemPerPage={appointmentsPerPage} 
                  totalItems={attendedAppoint.length}
                  paginate={paginate}/>
              </div>
            )}
          </div>
          <div>
            <h6 className='ms-2 mt-4'>Attended Appointments</h6>
            {attendedAppoint && (
              <div>
                <AttendedAppList attendedAppoint={currentAttApps}/>
                <Pagination2 
                  itemPerPage={appointmentsPerPage1} 
                  totalItems={attendedAppoint.length}
                  paginate={myPaginate}/>
              </div>
            )}
          </div>    
    </div>
  )
}
