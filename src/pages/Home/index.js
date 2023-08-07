import Table from '../../components/Patients/Table';
import Line from '../../components/Patients/graphs/Line';
import Pie from '../../components/Patients/graphs/Pie';
import TotalPatients from '../../components/Patients/TotalPatients';
import TotalAppointments from '../../components/Patients/TotalAppointments';
import PendingAppointments from '../../components/Patients/PendingAppointments';
import AttendedAppointments from '../../components/Patients/AttendedAppointments';
import { useState } from 'react';
import Spinner from '../../components/Spinner';

export default function Index() {
    const currentUser = localStorage.getItem("user")
    const [loading, setLoading] = useState(false);

    if(!currentUser){
        setLoading(true);
        return <Spinner/>
    }
  return (
    <div className='row'>
        <div className='col-lg-8 col-md-4 col-sm-auto'>
            <div className='mb-3 row'>
                <div className='col-lg-3 col-md-4 col-sm-auto'>
                    <TotalPatients/>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-auto'>
                  {currentUser && (
                    <TotalAppointments currentUser={currentUser}/>
                  )}
                  
                </div>
                <div className='col-lg-3 col-md-4 col-sm-auto'>
                  {currentUser && (
                    <AttendedAppointments currentUser={currentUser}/>
                  )}
                  
                </div>
                <div className='col-lg-3 col-md-4 col-sm-auto'>
                  {currentUser && (
                    <PendingAppointments currentUser={currentUser}/>
                  )}
                </div>
            </div>
            <Table/>
        </div>
        <div style={{background: '#fff'}} className='col-lg-4 col-md-4 col-sm-auto'>
            <div className='mb-4'>
                <Line/>       
            </div>
                <div>
                    <Pie/>
                </div>
            </div>
    </div>
  )
}
