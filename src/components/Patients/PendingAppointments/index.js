import { MdPendingActions} from "react-icons/md";
import { useEffect, useState } from "react";
import {  collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function Index({currentUser}) {
  const [pendingApp, setPendingApp] = useState();

  useEffect(() =>{
    const allPend = async () => {
      if(currentUser){
        const getPendApp = query(
          collection(db, `DiaFixDoctor/${currentUser}/Appointments`),
          where('attended', "==", "false")
        );
  
        const allPend = await getDocs(getPendApp);
  
        setPendingApp(allPend.docs.length);
      }
    }

    allPend();
  })
  return (
    <div>
        <div className='card mb-2' style={{background: "#3eb992", color: '#fff'}}>
          <MdPendingActions className='myIcons pt-3'/>
          <p className='ps-3'>Pending Appointments</p>
          <p className='ps-3 fs-1 counter-count '>{pendingApp}</p>
        </div>
    </div>
  )
}
