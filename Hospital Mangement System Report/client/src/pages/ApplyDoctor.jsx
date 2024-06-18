import React from 'react';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import {Col, Form, Input, Row, TimePicker, message} from 'antd'
import moment from 'moment';

const ApplyDoctor = () => {

    const {user} = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //handle form 
    const handleFinish = async(values) => {
        try {
            dispatch(showLoading())
            const formattedTimings = values.timings.map(time => time.format("HH:mm"));
            const res = await axios.post("http://localhost:3002/user/apply-doctor", 
            {...values, 
                userId:user._id,
                timings: formattedTimings
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.success)
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

  return (
      <>
        <Navbar/>
        <div className=' bg-[#ECF4FF] h-[600px] w-[1200px] m-auto rounded-2xl mt-9 shadow-lg shadow-black'>
            <div className='font-bold text-2xl text-center p-4 underline underline-offset-8'>Apply as Doctor</div>
            <Form layout = "vertical" onFinish = {handleFinish} className='p-7'>
                <div className=' text-2xl font-semibold mb-4'>Personal Details :</div>
                <Row gutter={20} className='flex'>
                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label = "First Name" name = "firstName" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your First Name'></Input>
                    </Form.Item>
                    </Col>

                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label = "Last Name" name = "lastName" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your Last Name'></Input>
                    </Form.Item>
                    </Col>

                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label = "Phone No" name = "mobile" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your Contant No.'></Input>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label = "Email" name = "email" required rules = {[{required:true}]}>
                        <Input type = "email" placeholder='Enter Your Email Address'></Input>
                    </Form.Item>
                    </Col>

                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label = "Website" name = "website" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your Website'></Input>
                    </Form.Item>
                    </Col>

                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label = "Address" name = "address" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your Clinic Address'></Input>
                    </Form.Item>
                    </Col>
                </Row>

                <div className=' text-2xl font-semibold mb-4'>Personal Details :</div>
                <Row gutter = {20}>
                <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label =  "Specialization" name = "specialization" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your Specialization'></Input>
                    </Form.Item>
                    </Col>
                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label =  "Experience" name = "experience" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your Experience'></Input>
                    </Form.Item>
                    </Col>

                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label =  "Fees per consultation" name = "feesPerCunsaltation" required rules = {[{required:true}]}>
                        <Input type = "text" placeholder='Enter Your Fees'></Input>
                    </Form.Item>
                    </Col>

                    <Col xs ={24} md = {24} lg = {8}>
                    <Form.Item label =  "Timings" name = "timings" required rules = {[{required:true}]}>
                        <TimePicker.RangePicker format = "HH:mm" />
                    </Form.Item>
                    </Col>
                    
                </Row>
                <div className='flex w-full justify-center'>
                        <button type='submit' className=' bg-orange-400 px-9 py-2 rounded-md font-mono hover:bg-orange-500'>Apply</button>
                </div>
            </Form>
        </div>
      </>
  )
}

export default ApplyDoctor