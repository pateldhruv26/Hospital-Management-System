import React,{useEffect, useState} from 'react'
import Navbar from '../../components/Navbar'
import Footter from '../../components/Footter'
import axios from 'axios';
import { Table, message } from 'antd';

const Doctors = () => {

    const [Doctors, setDoctors] = useState([])

    //getDoctors
    const getDoctors = async() => {
        try {
            const res = await axios.get('http://localhost:3002/admin/getAllDoctors', {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //hnadle Account
    const handleAccountStatus = async(record, status) => {
        try {
            const res = await axios.post('http://localhost:3002/admin/changeAccountStatus',
                {doctorId : record._id, userId : record.userId, status:status}, 
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if(res.data.success){
                message.success(res.data.message);
                window.location.reload();
            }
        } catch (error) {
            message.error("Something went wrong.")
            console.log(error);
        }
    }

    useEffect(()=>{
        getDoctors();
    },[])

    const columns = [
        {
            title: 'Name',
            dataIndex : 'name',
            render : (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: 'Status',
            dataIndex : 'status',
        },
        {
            title: 'Phone no.',
            dataIndex : 'mobile',
        },
        {
            title: 'Actions',
            dataIndex : 'actions',
            render : (text,record) => (
                <div className='flex'>
                    {record.status === 'pending' ? (
                        <button onClick={()=>{handleAccountStatus(record, "approved")}} className=' bg-green-500 text-white py-1 px-2 rounded-lg'>Approve</button>
                    ) : (
                        <button className=' bg-red-500 text-white py-1 px-2 rounded-lg'>Reject</button>
                    )}
                    
                </div>
            )
        },
    ]
  return (
    <>
      <Navbar/>
      <div className='p-10 bg-slate-100 h-[650px] gap-7 flex flex-col'>
        <div className=' bg-slate-200 px-2 py-3 rounded-lg text-2xl text-center font-bold font-mono'>Doctor List</div>
        <Table columns={columns} dataSource={Doctors}/>
      </div>
      <Footter/>
    </>
  )
}

export default Doctors
