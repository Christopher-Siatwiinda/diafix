import React from "react";
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";

export default function index() {
    const state ={
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                label: "Days",
                backgroundColor: [
                    '#5e0451',
                    "#3eb992",
                    '#ff03d9',
                    '#0066b2',
                    'tomato',
                ],
                borderColor: "gray",
                borderWidth: 2,
                data: [78, 50, 125, 78, 100]
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
                text: "Days in a week",
                display: true,
                fontSize: 20
            }
        }
    }
  return (
    <div className="piechart">
        <Pie
            data={state}
            options={options}
        />
    </div>
  )
}