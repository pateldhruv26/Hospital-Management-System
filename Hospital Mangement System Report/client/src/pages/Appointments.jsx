import React, { useState, useEffect } from "react"; 
import axios from "axios";
import moment from "moment"
import { Table } from "antd";
import Navbar from "../components/Navbar";
import Footter from "../components/Footter";


const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try{
            const res = await axios.get("http://localhost:3002/user/user-appointments", { 
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if(res.data.success){
                setAppointments(res.data.data);
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    },[])

    const columns = [
        {
            title: "Name",
            dataIndex : "doctorName",
            render: (text, record) => (
                <span className=" text-lg">
                    Dr. {record.doctorName}
                </span>
            )
        },
        {
            title: "Date",
            dataIndex : "date",
            render: (text, record) => (
                <span className=" text-lg">
                    {record.date}
                </span>
            )
        },
        {
            title: "Time",
            dataIndex : "time",
            render: (text, record) => (
                <span className=" text-lg">
                    {record.time}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex : "status",
            render: (text, record) => (
                <span className={record.status === "Approved" ? "text-lg text-green-500" : "text-lg text-red-600" }>
                    {record.status}
                </span>
            )
        }
    ]
    return (
        <>
            <Navbar/>
            <div className='p-10 bg-slate-100 h-[650px] flex flex-col'>
            <div className=' bg-slate-200 py-3 rounded-lg text-2xl text-center font-bold font-mono w-[1420px] mx-auto'>Appointment List</div>
                <div className="p-5 mt-6 h-[500px]">
                    <Table columns = {columns} dataSource = {appointments}/>
                </div>
            </div>
            <Footter/>
        </>
    );
};

export default Appointments;