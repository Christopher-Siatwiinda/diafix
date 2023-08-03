import { AiFillSchedule } from "react-icons/ai";
import { useEffect, useState } from "react";
import {  collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function Index({currentUser}) {
  const [attendedApp, setAttendedApp] = useState();

  useEffect(() =>{
    const allAtt= async () => {
      if(currentUser){
        const getPatients = query(
          collection(db, `DiaFixDoctor/${currentUser}/Appointments`),
          where('attended', "==", "true")
        );
  
        const allAttend = await getDocs(getPatients);
  
        setAttendedApp(allAttend.docs.length);
      }
    }

    allAtt();
  })
  return (
    <div>
        <div className='card mb-2' style={{background: "#18416d", color: '#fff'}}>
          <AiFillSchedule className='myIcons pt-3'/>
          <p className='ps-2'>Attended Appointments</p>
          <p className='ps-2 fs-1 counter-count '>{attendedApp}</p>
        </div>
    </div>
  )
}
