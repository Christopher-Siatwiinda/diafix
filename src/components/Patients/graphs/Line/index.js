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

    useEffect(() => {
        const getGraphData =  async () => {
            const getApp = query(
                collection(db, `MyDiaFix/${UserID}/Glucose Data`)
            );

            const myPatients = await getDocs(getApp);

            if(myPatients){
                for(let i = 0; i < myPatients.docs.length; ++i){
                    setMyData(myPatients.docs.map((doc) => (doc.data().glucose_VG)))
                    setMyLabel(myPatients.docs.map((doc) => (doc.data().upload_Date)))
                }
            }   
        }

        getGraphData();
    }, []);
 
    const state ={
        labels: myLabel,
        datasets: [
            {
                label: "Glucose Data",
                backgroundColor: "#5e0451",
                borderColor: "gray",
                borderWidth: 2,
                data: myData
            }
        ]
    } 
   
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                text: "Glucose Graph",
                display: true,
                fontSize: 20
            }
        }
    }
  return (
    <div className="linegraph" style={{
        width: "400px",
        height: "200px"
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
