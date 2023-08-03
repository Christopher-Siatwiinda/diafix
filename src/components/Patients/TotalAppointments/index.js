import { useState,useEffect } from "react";
import { MdSchedule } from "react-icons/md";
import {  collection, query, getDocs} from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function Index({currentUser}) {
  const [appoint, setAppoint] = useState()

  useEffect(() =>{
    const allApp = async () => {
      if(currentUser){
        const getApp = query(
          collection(db, `DiaFixDoctor/${currentUser}/Appointments`),
          //where('attended', "==", "false")
        );
  
        const allAppo = await getDocs(getApp);
  
        setAppoint(allAppo.docs.length);
      }
    }

    allApp();
  })
  return (
    <div>
        <div className='card mb-2' style={{background: "#3eb992", color: '#fff'}}>
          <MdSchedule className='myIcons ps-3 pt-3'/>
          <p className='ps-3'>All Appointments</p>
          <p className='ps-3 fs-1 counter-count'>{appoint}</p>
        </div>
    </div>
  )
}
