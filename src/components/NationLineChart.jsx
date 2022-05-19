import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto";

export default function NationLineChart() {
    const [USData, changeUSData] = useState('')

    useEffect(() =>{
        fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
        .then(response => response.json())
        .then(response => changeUSData({
            labels: response.data.reverse().map((d) => d['ID Year']),
            datasets: [{
                'label': 'United States Of America Population',
                'data': response.data.map((d) => d['Population'])
            }]
        }))
    }, []);

    if (USData) {
        return(
            <div className='w-1'>
            <Line datasetIdKey='id' data={USData}/>
            </div>
        )
    } else{
        <h1>loading</h1>
    }
    
};