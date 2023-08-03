import React, { useEffect, useState } from "react";
//import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export default function Index({UserID}) {
    console.log(UserID)
    const [myLabel, setMyLabel] = useState([]);
    const [myData, setMyData] = useState([]);
    const [myData2, setMyData2] = useState([]);

    useEffect(() => {
        const getGraphData =  async () => {
            const getApp = query(
                collection(db, `MyDiaFix/${UserID}/Blood Pressure`)
            );

            const myPatients = await getDocs(getApp);

            if(myPatients){
                for(let i = 0; i < myPatients.docs.length; ++i){
                    setMyData(myPatients.docs.map((doc) => (doc.data().systolic)))
                    setMyLabel(myPatients.docs.map((doc) => (doc.data().date)))
                    setMyData2(myPatients.docs.map((doc) => (doc.data().diastolic)))
                }
            }   
        }

        getGraphData();
    }, [])
    
    const state ={
        labels: myLabel,
        datasets: [
            {
                label: "Systolic",
                backgroundColor: "#5e0451",
                borderColor: "gray",
                borderWidth: 2,
                data: myData
            },
            {
                label: 'Diastolic',
                data: myData2,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderWidth: 2,
            }
        ]
    } 
   

    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom"
            },
            title: {
                text: "BP Graph",
                display: true,
                fontSize: 30
            }
        }
    }
  return (
    <div className="linegraph" style={{
        width: "400px",
        height: "200px",
        marginBottom: "20px",
        marginTop: "20px"
    }}>
        <Line
            data={state}
            options={
                options
            }
        />
    </div>
  )
}
