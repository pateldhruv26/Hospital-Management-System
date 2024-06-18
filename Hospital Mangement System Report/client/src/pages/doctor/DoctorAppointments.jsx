import React, { useState, useEffect } from "react";
import moment from "moment";
import { Table, message } from "antd";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footter from "../../components/Footter";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3002/doctor/doctor-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async(record, status)=> {
    try {
        console.log("iske uper")
        const res = await axios.post('http://localhost:3002/doctor/update-status',{appointmentsId : record._id , status}, {
          headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("iske niche")
      if(res.data.success){
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log('error', error);
      message.error('Something went Wrong');
    }
  }
  const columns = [
    {
        title: "Patient's Name",
        dataIndex : "patientName",
        render : (text, record) => (
            <span className="text-lg">{record.patientName}</span>
        )
    },
    {
      title: "Date",
      dataIndex: "date",
      render : (text, record) => (
        <span className="text-lg">{record.date}</span>
    )
    },
    {
      title: "Time",
      dataIndex: "time",
      render : (text, record) => (
        <span className="text-lg">{record.time}</span>
    )
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span className={record.status === "Approved" ? "text-lg text-green-500" : "text-lg text-red-600" }>
            {record.status}
        </span>
    ) 
    },
    {
        title : "Actions",
        dataIndex : 'actions',
        render : (text, record) => (
            <div className=" flex">
                {record.status === "pending" ? (
                    <div className="flex gap-4">
                        <button onClick={()=> handleStatus(record, "Approved")} className=" bg-[#3ca743] font-bold px-2 py-1 rounded-lg hover:bg-[#19173f] duration-100 ease-linear text-white">Approve</button>
                        <button onClick={()=> handleStatus(record, "Reject")} className=" bg-[#f93e4b] font-bold px-4 py-1 rounded-lg hover:bg-[#19173f] duration-100 ease-linear text-white">Reject</button>
                    </div>
                ) : (
                  <span className="text-lg">No Actions</span>
                )}
            </div>
        )
    },
  ];
  return (
    <>
      <Navbar/>
      <div className='p-10 bg-slate-100 h-[650px] flex flex-col'>
          <div className=' bg-slate-200 py-3 rounded-lg text-2xl text-center font-bold font-mono w-[1420px] mx-auto'>Appointment List</div> 
            <div className="p-5 mt-6 h-[500px]">
              <Table columns={columns} dataSource={appointments}/>
            </div>
      </div>
      <Footter/>
    </>
  );
};

export default DoctorAppointments;
