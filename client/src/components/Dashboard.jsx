import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Navbar from './Navbar';
// import axios from 'axios';

// import { images } from '../javascript/imageImports.js';

const Dashboard = () => {

    const [blockArr, setBlockArr] = useState([]);
    const [disabledRun, setDisabledRun] = useState(false);
    const [schedule, setSchedule] = useState([]);

    const base_url = "http://localhost:4000/";

    useEffect(() => {
        console.log("request sent to " + base_url);
        // axios.get(base_url)
        //     .then(res => {
        //         console.log(res);
        //         setSchedule(res);
        //     });
        const obj = [[[['C1', 1, 'loading']], [['C2', 4, 'loading'], ['C2', 3, 'loading']]], [[['C1', 1, 'loading']], [['C2', 3, 'loading']]], [[['C1', 1, 'loading'], ['C1', 2, 'loading']], [['C2', 4, 'loading'], ['C2', 2, 'discharging'], ['C2', 4, 'discharging']]], [[['C1', 2, 'loading'], ['C1', 2, 'discharging']], [['C2', 4, 'loading'], ['C2', 4, 'discharging']]]];
        setSchedule(obj);
    }, []);

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms));

    const handleRun = async () => {
        setDisabledRun(true);
        setBlockArr([]);
        let blocks = [];
        // console.log(schedule);
        for (let i=0; i < schedule.length; i++){
            let time_slot = i+1;
            let job_lists = schedule[i];
            let c1_jobs = job_lists[0];
            let c2_jobs = job_lists[1];

            if (i === 0){
                blocks.push(
                    <div className="container-block-row row gx-2 my-2 text-center align-items-center" key={uuid()}>
                        <div className="time-slot col-1">
                            <div className="py-1 px-2"><strong className='pe-2'>T{time_slot}</strong><i className="bi bi-arrow-right"></i></div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A1</div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A2</div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A3</div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A4</div>
                        </div>
                    </div>
                );
            }
            else{
                let block_arr = [...blocks];
                blocks.push(
                    block_arr[block_arr.length-1]
                );
            }

            setBlockArr([...blocks]);
            await timer(1000);

            let max_length = Math.max(c1_jobs.length, c2_jobs.length);
            // console.log(max_length);

            for (let j=0; j < max_length; j++){
                // console.log("j: " + j);
                // console.log("c1: " + c1_jobs.length);
                // console.log("c2: " + c2_jobs.length);
                // console.log();
                blocks.pop();

                blocks.push(
                    <div className="container-block-row row gx-2 my-2 text-center align-items-center" key={uuid()}>
                        <div className="time-slot col-1">
                            <div className="py-1 px-2"><strong className='pe-2'>T{time_slot}</strong><i className="bi bi-arrow-right"></i></div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A1
                                {c1_jobs.length > j ? c1_jobs[j][1] === 1 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 1 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 1 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 1 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A2
                                {c1_jobs.length > j ? c1_jobs[j][1] === 2 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 2 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 2 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 2 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A3
                                {c1_jobs.length > j ? c1_jobs[j][1] === 3 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 3 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 3 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 3 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2`}>A4
                                {c1_jobs.length > j ? c1_jobs[j][1] === 4 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 4 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 4 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 4 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                    </div>
                );

                setBlockArr([...blocks]);
                await timer(2000);
            }
            
        }
        setDisabledRun(false);
    }

    return (
        <div className='dashboard container-fluid vh-100 p-0'>
            <div className="row p-0">
                <Navbar />
            </div>
            <div className="row p-0">
                <div className="col-9 d-flex">
                    <p className="flex-grow-1 lead my-2">Container Blocks</p>
                    <button type='button' className="btn btn-outline-dark btn-sm my-2 mx-2">Upload<i className="bi bi-upload ps-2"></i></button>
                    <button type='button' className={`btn btn-outline-success btn-sm my-2 mx-2 ${disabledRun ? "disabled" : ""}`} onClick={handleRun}>Run<i className="bi bi-play ps-2"></i></button>
                </div>
                <div className="col-3 d-flex">
                    <p className="flex-grow-1 lead my-2">Schedule</p>
                    <button type='button' className="btn btn-outline-warning btn-sm my-2 mx-2">Download<i className="bi bi-download ps-2"></i></button>
                </div>
            </div>
            <div className="row p-0">
                <div className="col-9 visualizing-section">
                    {blockArr}
                </div>
                <div className="col-3 table-section">
                    <table className="table table">
                        <thead>
                            <tr>
                                <th scope='col'>Time Slot</th>
                                <th scope='col'>Crane</th>
                                <th scope='col'>Block</th>
                                <th scope='col'>L/D</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>T1</td>
                                <td>C1</td>
                                <td>A1</td>
                                <td>L</td>
                            </tr>
                            <tr>
                                <td rowSpan={2}>T2</td>
                                <td>C1</td>
                                <td>A1</td>
                                <td>L</td>
                            </tr>
                            <tr>
                                {/* <td scope='row'>T2</td> */}
                                <td>C1</td>
                                <td>A1</td>
                                <td>L</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;