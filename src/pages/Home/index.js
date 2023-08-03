import Table from '../../components/Patients/Table';
import Line from '../../components/Patients/graphs/Line';
import Pie from '../../components/Patients/graphs/Pie';
import TotalPatients from '../../components/Patients/TotalPatients';
import TotalAppointments from '../../components/Patients/TotalAppointments';
import PendingAppointments from '../../components/Patients/PendingAppointments';
import AttendedAppointments from '../../components/Patients/AttendedAppointments';
import {useAuth} from '../../contexts/AuthContext';
import { useState } from 'react';
import Spinner from '../../components/Spinner';

export default function Index() {
    const {currentUser} = useAuth();
    const [loading, setLoading] = useState(true);

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
