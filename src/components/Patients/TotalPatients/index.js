import { useState, useEffect } from "react";
import { FaUserInjured } from "react-icons/fa";
import {collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function Index() {
  const [allPati, setAllPati] = useState()
  
  useEffect(() =>{
    const allPatients = async () => {
      const getPatients = query(
        collection(db, 'MyDiaFix'),
      );

      const allPat = await getDocs(getPatients);

      setAllPati(allPat.docs.length);
    }

    allPatients();
  })
  return (
    <div>
        <div className='card mb-2' style={{background: "#18416d", color: '#fff'}}>
          <FaUserInjured className='myIcons ps-3 pt-3'/>
          <p className='ps-3'>All Patients</p>
          <p className='ps-3 fs-1 counter-count '>{allPati}</p>
        </div>
    </div>
  )
}
