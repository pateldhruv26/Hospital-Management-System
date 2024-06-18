import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import {Col, Form, Input, Row, TimePicker, message} from 'antd'
import moment from 'moment';

const Profile = () => {
    const {user} = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    //get Doctor Detail
    const getDoctorInfo = async() => {
        try {
            const res = await axios.post('http://localhost:3002/doctor/getDoctorInfo',
            {userId: params.id},
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                }
            })
            if(res.data.success){
                setDoctor(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(doctor);
    }
//===============Update Doctor===============
const handleFinish = async(values) => {
    try {
        dispatch(showLoading())
        const res = await axios.post("http://localhost:3002/doctor/updateProfile", 
        {...values, 
            userId:user._id, 
            timings:[
                moment(values.timings[0]).format("HH:mm"),
                moment(values.timings[1]).format("HH:mm"),
            ]},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
            navigate('/')
        }else{
            message.error(res.data.success)
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went Wrong ')
    }
}
//===============Update Doctor===============
    
useEffect(()=>{
    getDoctorInfo();
},[]);
  return (
    <>
      <Navbar/> 

      {doctor && (
        <div className=' bg-[#ECF4FF] h-[600px] w-[1200px] m-auto rounded-2xl mt-9 shadow-lg shadow-black'>
        <div className='font-bold text-2xl text-center p-4 underline underline-offset-8'>Profile</div>
        <Form layout = "vertical" onFinish = {handleFinish} className='p-7'
         initialValues={{
            ...doctor,
            timings:[
                moment(doctor.timings[0], "HH:mm"),
                moment(doctor.timings[1], "HH:mm"),
            ]
            }}>
            <div className=' text-2xl font-semibold mb-4'>Personal Details :</div>
            <Row gutter={20} className='flex'>
                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label = "First Name" name = "firstName" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='Your first name' name='firstName'></Input>
                </Form.Item>
                </Col>

                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label = "Last Name" name = "lastName" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='your last name'></Input>
                </Form.Item>
                </Col>

                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label = "Phone No" name = "mobile" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='your contant no'></Input>
                </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label = "Email" name = "email" required rules = {[{required:true}]}>
                    <Input type = "email" placeholder='your email address'></Input>
                </Form.Item>
                </Col>

                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label = "Website" name = "website" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='your website'></Input>
                </Form.Item>
                </Col>

                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label = "Address" name = "address" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='your clinic address'></Input>
                </Form.Item>
                </Col>
            </Row>

            <div className=' text-2xl font-semibold mb-4'>Personal Details :</div>
            <Row gutter = {20}>
            <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label =  "Specialization" name = "specialization" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='your specialization'></Input>
                </Form.Item>
                </Col>
                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label =  "Experience" name = "experience" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='your experience'></Input>
                </Form.Item>
                </Col>

                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label =  "Fees per consultation" name = "feesPerCunsaltation" required rules = {[{required:true}]}>
                    <Input type = "text" placeholder='your fees'></Input>
                </Form.Item>
                </Col>

                <Col xs ={24} md = {24} lg = {8}>
                <Form.Item label =  "Timings" name = "timings" required rules = {[{required:true}]}>
                    <TimePicker.RangePicker format = "HH:mm" />
                </Form.Item>
                </Col>
                
            </Row>
            <div className='flex w-full justify-center'>
                    <button type='submit' className=' bg-orange-400 px-9 py-2 rounded-md font-mono hover:bg-orange-500'>Update</button>
            </div>
        </Form>
    </div>
      )}
    </>
  )
}

export default Profile
