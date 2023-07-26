import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Navbar from './Navbar';
import axios from 'axios';

// import { images } from '../javascript/imageImports.js';

const Dashboard = () => {

    const [blockArr, setBlockArr] = useState([]);
    const [disabledRun, setDisabledRun] = useState(false);
    const [schedule, setSchedule] = useState([]);

    const [tableRows, setTableRows] = useState([]);

    const base_url = "http://localhost:5000/";

    useEffect(() => {
        console.log("request sent to " + base_url);
        axios.get(base_url)
            .then(res => {
                console.log(res.data);
                setSchedule(res.data);
                console.log("response fetched");
            })
            .catch(error => {
                console.log(error);
            });
        // const obj = [[[['C1', 1, 'L']], [['C2', 4, 'L'], ['C2', 3, 'L']]], [[['C1', 1, 'L']], [['C2', 3, 'L']]], [[['C1', 1, 'L'], ['C1', 2, 'L']], [['C2', 4, 'L'], ['C2', 2, 'D'], ['C2', 4, 'D']]], [[['C1', 2, 'L'], ['C1', 2, 'D']], [['C2', 4, 'L'], ['C2', 4, 'D']]], [[['C1', 1, 'L'], ['C1', 1, 'D']], [['C2', 3, 'L'], ['C2', 3, 'D']]], [[['C1', 1, 'D']], [['C2', 2, 'D'], ['C2', 3, 'D']]], [[['C1', 3, 'L'], ['C1', 2, 'D']], [['C2', 3, 'D']]], [[['C1', 1, 'L'], ['C1', 3, 'L']], [['C2', 2, 'L'], ['C2', 3, 'D']]], [[['C1', 2, 'L']], [['C2', 4, 'L']]], [[['C1', 1, 'L'], ['C1', 3, 'D']], [['C2', 3, 'L'], ['C2', 4, 'L']]], [[['C1', 2, 'L'], ['C1', 1, 'D']], [['C2', 3, 'L'], ['C2', 3, 'D']]], [[['C1', 2, 'L'], ['C1', 1, 'D']], [['C2', 3, 'L'], ['C2', 2, 'D'], ['C2', 3, 'D']]]];
        // setSchedule(obj);
    }, []);

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms));

    const handleRun = async () => {
        setDisabledRun(true);
        setBlockArr([]);
        setTableRows([]);
        let blocks = [];
        // console.log(schedule);
        for (let i=0; i < schedule.length; i++){
            let time_slot = i+1;
            let job_lists = schedule[i];
            let c1_jobs = job_lists[0];
            let c2_jobs = job_lists[1];

            // let rowSpan = c1_jobs.length + c2_jobs.length;


            if (i === 0){
                blocks.push(
                    <div className="container-block-row row gx-2 my-2 text-center align-items-center" key={uuid()}>
                        <div className="time-slot col-1">
                            <div className="py-1 px-2"><strong className='pe-2'>T{time_slot}</strong><i className="bi bi-arrow-right"></i></div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A1</div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A2</div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A3</div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A4</div>
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
            await timer(500);

            let max_length = Math.max(c1_jobs.length, c2_jobs.length);
            // console.log(max_length);

            for (let j=0; j < max_length; j++){

                let row = [];

                if (c1_jobs.length > j){
                    row.push(
                        <tr className='text-center'>
                            <td>{"T" + time_slot}</td>
                            <td>C1</td>
                            <td>{"A" + c1_jobs[j][1]}</td>
                            <td>{c1_jobs[j][2] === 'L' ? "Loading" : "Discharging"}</td>
                        </tr>
                    );
                }

                if (c2_jobs.length > j){
                    row.push(
                        <tr className='text-center'>
                            <td>{"T" + time_slot}</td>
                            <td>C2</td>
                            <td>{"A" + c2_jobs[j][1]}</td>
                            <td>{c2_jobs[j][2] === 'L' ? "Loading" : "Discharging"}</td>
                        </tr>
                    );
                }

                setTableRows(tableRows => [...tableRows, ...row]);
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
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A1
                                {/* {c1_jobs.length > j ? c1_jobs[j][1] === 1 ? <img src={images.port_crane} alt="" /> : "" : c1_jobs[c1_jobs.length-1][1] === 1 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""} */}
                                {c1_jobs.length > j ? c1_jobs[j][1] === 1 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 1 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 1 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 1 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A2
                                {c1_jobs.length > j ? c1_jobs[j][1] === 2 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 2 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 2 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 2 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A3
                                {c1_jobs.length > j ? c1_jobs[j][1] === 3 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 3 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 3 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 3 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                        <div className="block col position-relative">
                            <div className={`border rounded-3 py-1 px-2 bg-light`}>A4
                                {c1_jobs.length > j ? c1_jobs[j][1] === 4 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[j][2]}`}></i> : "" : c1_jobs[c1_jobs.length-1][1] === 4 ? <i className={`bi bi-c-circle-fill ps-2 ${c1_jobs[c1_jobs.length-1][2]}`}></i> : ""}
                                {c2_jobs.length > j ? c2_jobs[j][1] === 4 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[j][2]}`}></i> : "" : c2_jobs[c2_jobs.length-1][1] === 4 ? <i className={`bi bi-c-circle ps-2 ${c2_jobs[c2_jobs.length-1][2]}`}></i> : ""}
                            </div>
                        </div>
                    </div>
                );

                setBlockArr([...blocks]);
                await timer(500);
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
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th scope='col'>Slot</th>
                                <th scope='col'>Crane</th>
                                <th scope='col'>Block</th>
                                <th scope='col'>L/D</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;