import React, {useEffect, useState} from 'react';
import Table from '../../components/Patients/Table';
import TotalPatients from '../../components/Patients/TotalPatients';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { HiOutlineDatabase } from 'react-icons/hi';
import { BsGraphUp } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import Line from '../../components/Patients/graphs/Line';
import BPLine from '../../components/Patients/graphs/BPLine';
import BMILine from '../../components/Patients/graphs/BMILine';
import Data from '../../components/Patients/Data';
import { BiBorderRadius } from 'react-icons/bi';
import { Alert } from '@mui/material';

export default function Index() {
  const [search, setSearch] = useState("");
  const [pat, setPat] = useState([]);
  const [myData, setMyData] = useState([]);
  const [toggle, setToggle] = useState(1);

    const getPatient = async () => {
      if(search){
        const myPat = query(
          collection(db, "MyDiaFix"),
          where('NRC', "==", search));

          const myPatients = await getDocs(myPat);

          setPat(myPatients.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
    }

    const toggleTab = (index) => {
      setToggle(index)
    }

  return (
    <div className='mt-4'>
        <div className='mb-3 row'>
          <div className='col-lg-5 col-md-4 col-sm-auto'>
            <div className='mb-3 row'>
              <div className='col-lg-6 col-md-6 col-sm-auto'>
                <TotalPatients/>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <input 
                onChange={(event) => {setSearch(event.target.value)}} 
                type="search text" 
                className="form-control form-control-dark mb-3 mt-3 rounded-start shadow" 
                placeholder="Search by NRC" 
                aria-label="Search" 
                aria-describedby="search-addon" 
                name="search"
                style={{width: 90+"%"}}/>
                <button onClick={getPatient} className="btn btn-sm"><FaSearch/></button>
            </div>
            {pat.length > 0 ? (<div>
              {pat.map((pt)=>(
                <div>
                   <div style={{background: "#fff", paddingLeft: 10+"px"}} class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 rounded shadow">
                      <h1 class="h6 bold">Patients</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                              <th scope="col">Full Name</th>
                              <th scope="col">NRC</th>
                              <th scope="col">Graphs</th>
                              <th scope="col">Data</th>
                            </tr>
                        </thead>
                          <tbody>
                            <tr>
                              <td>{pt.fullName}</td>
                              <td>{pt.NRC}</td>
                              <td><button onClick={() => toggleTab(1)} className="btn btn-sm"><BsGraphUp/></button></td>
                              <td><button onClick={() => toggleTab(2)} className="btn btn-sm"><HiOutlineDatabase/></button></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                  ))}
                </div>) : (
              <div>
                <Alert severity='info'>
                  Search for a Patient using NRC
                </Alert>
              </div>
            )}
          </div>
          <div className='col-lg-7 col-md-4 col-sm-auto'>
            <div className='rounded shadow text-muted'>
              {pat.length > 0 ? (
                <div>
                  {pat.map((pt)=>(
                    <div>
                        <div className='bloc-tabs d-flex bg-white shadow p-3'>
                          <button
                          style={{ 
                            marginTop: 10+"px", 
                            paddingTop: 5+"px",
                            paddingRight: 35+'px',
                            paddingLeft: 35+'px',
                            paddingBottom: 5+'px',
                            borderRadius: "10px",
                            marginRight: "5px"}}
                          onClick={() => toggleTab(1)} 
                          className={toggle === 1 ? "tabs active-tabs" : "tabs"}>Graphs</button>
                          <button
                          style={{
                            marginTop: 10+"px", 
                            paddingTop: 5+"px",
                            paddingRight: 35+'px',
                            paddingLeft: 35+'px',
                            paddingBottom: 5+'px',
                            borderRadius: "10px"}} 
                          onClick={() => toggleTab(2)} 
                          className={toggle === 2 ? "tabs active-tabs" : "tabs"}>Data</button>
                        </div>

                        <div className={toggle === 1 ? "content active-content" : "content" }>
                            <div className='bg-white text-center p-2 rounded'>
                              <Line key={pt.UserID} UserID={pt.UserID}/>
                              <BPLine key={pt.UserID} UserID={pt.UserID}/>
                              <BMILine key={pt.UserID} UserID={pt.UserID}/>
                            </div>
                        </div> 
                        <div className={toggle === 2 ? "content active-content" : "content" }>
                            <Data key={pt.UserID} UserID={pt.UserID}/>
                        </div> 
                    </div>
                    ))}
                  </div>
                  ) : (
                    <div style={{height: "100%"}}>
                      <div style={{height: "300px"}} className='form-login'>
                      <h5>No Satient Search Yet</h5>
                      <h6>Searched Patient information will appear here</h6>
                      </div>
                    </div>
                  )}
            </div>
          </div>
        </div>
    </div>

  )
}
