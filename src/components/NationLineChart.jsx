import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { motion, AnimatePresence } from 'framer-motion';

export default function NationLineChart() {
    const [USData, changeUSData] = useState('')
    const [StateData, changeStateData] = useState('')
    const [SeeStateData, changeSeeStateData] = useState(false)

    useEffect(() =>{
        fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
        .then(response => response.json())
        .then(response => changeUSData({
            labels: response.data.reverse().map((d) => d['ID Year']),
            datasets: [{
                label: 'United States Of America Population',
                data: response.data.map((d) => d['Population']),
                backgroundColor: '#F1F1F6',
                hoverBackgroundColor: '#b32134',
                borderColor: '#3b3b6d',
                tension: .2,
                hoverBorderDash: 100,
                fill: true
               
            }],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                       ticks: {
                          beginAtZero: true
                       }
                    }]
                 }
            },
            
        }));
    }, []);

    useEffect(() => {
        fetch('https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest')
        .then(response => response.json())
        .then(response => changeStateData({
            labels: response.data.map((d) => d['State']),
            datasets: [{
                label: 'Pop. by State',
                data: response.data.map((d) => d['Population']),

                backgroundColor: ["#F1F1F6"],
                borderColor: "#b32134", 
            }],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                       ticks: {
                          beginAtZero: true,
                          maxRotation: 90,
                           minRotation: 90
                       }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }]
                 }
            },
        }));
    },[])
    const options = {
        maintainAspectRatio: false,
        borderWidth: 1,
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };



    if (USData) {
        return(
            <>
                <nav className='flex p-3 bg-slate-500 text-white'>
                    <h1>United States Population</h1>
                </nav>
                <div className='w-11/12 h-2/4 mx-auto'>
                    <Line datasetIdKey='US' data={USData}/>
                </div>
                <motion.button 
                className='p-3 mx-32 bg-slate-500 rounded text-white'
                whileHover={{ scale: 1.1 }}
                onClick={() => {changeSeeStateData(!SeeStateData)}}>
                    See Data by State
                </motion.button>
                <div className='mx-auto w-full'>
                {SeeStateData && StateData &&
                    <AnimatePresence>
                        <motion.div 
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        style={{ height: '1200px' }}
                        className='m-0 p-0'
                        >
                            <Bar width={1} height={1} datasetIdKey='US' data={StateData} options={options}/>
                        </motion.div>
                    </AnimatePresence>
                }
                </div>
                
            </>
        )
    } else{
        <h1>loading</h1>
    }
    
};