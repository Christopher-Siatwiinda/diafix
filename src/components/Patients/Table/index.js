import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot } from 'firebase/firestore';

export default function Index() {
  const [patients, setPatients] = useState([])

  useEffect(
    () =>
      onSnapshot(collection(db, "MyDiaFix"), limit(5), (snapshot) => 
        setPatients(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ), 
    []
  );

  return (
    <div>
        <div style={{background: "#fff", paddingLeft: 10+"px"}} class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 rounded shadow">
        <h1 class="h6 bold">Patients</h1>
        </div>
        <table className="table">
            <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">NRC</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
            </thead>
            {patients.map((patient) =>(
              <tbody>
                <tr key={patient.id}>
                  <td>{patient.fullName}</td>
                  <td>{patient.NRC}</td>
                  <td>{patient.Email}</td>
                  <td>{patient.Phone}</td>
                </tr>
              </tbody>
            ))
            }
            </table>
    </div>
  )
}
