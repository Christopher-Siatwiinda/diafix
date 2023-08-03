import React, { useEffect, useState } from 'react';
import { db } from '../../../config/firebase';
import { getDocs, collection, query } from 'firebase/firestore';
import { MdFastfood } from 'react-icons/md';
import { BiSolidTimeFive } from 'react-icons/bi';
import { MdReadMore } from 'react-icons/md';
import Logo from '../../../assets/logo192.png';

export default function Index({UserID}) {
    console.log(UserID)
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        const getGraphData =  async () => {
            const getApp = query(
                collection(db, `MyDiaFix/${UserID}/Glucose Data`)
            );

            const myPatients = await getDocs(getApp);

            if(myPatients){
                for(let i = 0; i < myPatients.docs.length; ++i){
                    setMyData(myPatients.docs.map((doc) => ({...doc.data(), id: doc.id})))
                }
            }   
        }

        getGraphData();
    }, []);

  return (
    <>
        {myData.length > 0 ? (
            <div>
                {myData.map((myD) => (
                    <div className='rounded p-3 mt-3 mb-3 shadow bg-white'>
                        <div className='row d-flex align-items-center justify-content-center'>
                            <div className='col-lg-4'>
                                <p className='fs-5'>{myD.upload_Date}</p>
                            </div>
                            <div className='col-lg-3 p-2'>
                               <img style={{height: "70px", width: "70px"}} src={myD.food_Image_URL}/> 
                            </div>
                            <div className='col-lg-5'>
                                <div className='row'>
                                    <div className='col-lg-9'>
                                        <div><img src={Logo} style={{height: "20px", width: "20px"}}/> {myD.glucose_VG} mmol/L</div>
                                        <div className='pt-2 pb-2'><MdFastfood style={{color: "#ff03d9"}}/> {myD.meal_Type}</div>
                                        <div><BiSolidTimeFive style={{color: "#ff03d9"}}/> {myD.upload_Time}</div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <button className="btn btn-sm"><MdReadMore/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div>

            </div>
        )}
    </>
  )
}
