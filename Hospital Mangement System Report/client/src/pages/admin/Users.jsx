import React,{useEffect, useState} from 'react'
import Navbar from '../../components/Navbar'
import Footter from '../../components/Footter'
import axios from 'axios';
import { Table } from 'antd';
const Users = () => {
    const [users, setUsers] = useState([]);
    
    //getUsers
    const getUsers = async() => {
        try {
            const res = await axios.get('http://localhost:3002/admin/getAllUsers', {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getUsers();
    },[])

    //ant Design Column
    const columns = [
        {
            title: 'Name',
            dataIndex : 'name',
        },
        {
            title: 'Mobile no.',
            dataIndex : 'mobile',
        },
        {
            title: 'Doctor',
            dataIndex : 'isDoctor',
            render : (text, record) => (
                <span>{record.isDoctor ? "Yes" : "No"}</span>
            )
        },
        {
            title: 'Actions',
            dataIndex : 'actions',
            render : (text,record) => (
                <div className='flex'>
                    <button className=' bg-red-500 text-white py-1 px-2 rounded-lg'>Block</button>
                </div>
            )
        },
    ]
  return (
    <>
      <Navbar/>
      <div className='p-10 bg-slate-100 h-[650px] gap-7 flex flex-col'>
        <div className=' bg-slate-200 px-2 py-3 rounded-lg text-2xl text-center font-bold font-mono'>User List</div>
        <Table columns={columns} dataSource={users}/>
      </div>
      <Footter/>
    </>
  )
}

export default Users
