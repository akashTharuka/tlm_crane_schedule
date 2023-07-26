import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
// import axios from 'axios';

// import { images } from '../javascript/imageImports.js';

const Dashboard = () => {

    const [blockArr, setBlockArr] = useState([]);
    const [disabledRun, setDisabledRun] = useState(false);
    const [schedule, setSchedule] = useState();

    const base_url = "http://localhost:4000/";

    useEffect(() => {
        console.log("request sent to " + base_url);
        // axios.get(base_url)
        //     .then(res => {
        //         console.log(res);
        //         setSchedule(res);
        //     });
        const obj = { 1: [[1, 1, 'L'], [2, 4, 'L'], [2, 3, 'L']], 2: [[1, 1, 'L'], [2, 3, 'L']] };
        // setSchedule({...obj});
    }, []);

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms));

    const handleRun = async () => {
        setDisabledRun(true);
        setBlockArr([]);
        // console.log("handling run");
        for (let i=0; i < 12; i++){
            let blocks = [];
            blocks.push(
                <div className="container-block-row row gx-2 my-2 text-center align-items-center" key={i}>
                    <div className="time-slot col-1">
                        <div className="py-1 px-2"><strong className='pe-2'>T1</strong><i className="bi bi-arrow-right"></i></div>
                    </div>
                    <div className="block col position-relative">
                        <div className="card py-1 px-2">A1</div>
                    </div>
                    <div className="block col position-relative">
                        <div className="card py-1 px-2">A2</div>
                    </div>
                    <div className="block col position-relative">
                        <div className="card py-1 px-2">A3</div>
                    </div>
                    <div className="block col position-relative">
                        <div className="card py-1 px-2">A4</div>
                    </div>
                </div>
            );
            await timer(1000);
            setBlockArr(blockArr => [...blockArr, ...blocks]);
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
                    <p className="flex-grow-1 lead my-2">Container Blocks: {schedule}</p>
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