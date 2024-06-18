import React from 'react'
import {useForm} from 'react-hook-form'
import homepg from '../../media/hero_bg.svg';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading} from '../redux/features/alertSlice';
import axios from 'axios';

const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async(data) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:3002/user/login',data)
            window.location.reload();
            dispatch(hideLoading())
            if(res.data.success){
                localStorage.setItem("token",res.data.token);
                message.success('Login Sucessfully');
                navigate('/');
            }else{
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Something went wrong!')
        }
    }
    return (
        <div style={{ backgroundImage: `url(${homepg})`, backgroundRepeat: "repeat", backgroundColor:"#040744",color:"#fffff" }} className='w-[100vw] h-[100vh] flex justify-center items-center'>
                <div className='bg-white min-h-[500px] min-w-[400px] m-auto border-[2px] rounded-lg pb-5'>
                    <div className='font-bold text-2xl text-center p-4 underline underline-offset-8'>Login</div>
                    <form /*method="POST"*/ className='mt-4 flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex flex-col'>
                            <div className='flex h-[40px] bg-[#eaeaea] border-[2px] w-[320px] rounded m-auto justify-start items-center gap-5'>
                                <img src="../../media/user.png" alt="Name" className='h-[25px] w-[25px] ml-2' />
                                <input required type="text" placeholder='Username' className='w-[250px] h-full bg-[transparent] px-2 rounded-md' style={{ border: "none", outline: "none" }}
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: "*This field is required.",
                                        }
                                    })}
                                />
                            </div>
                            {errors.username && <div className=' ml-12 text-red-600 text-sm font-mono'>{errors.username.message}</div>}
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex h-[40px] bg-[#eaeaea] border-[2px] w-[320px] rounded m-auto justify-start items-center gap-5'>
                                <img src="../../media/key.png" alt="Password" className='h-[25px] w-[25px] ml-2' />
                                <input type="password" placeholder='Password' className='w-[250px] h-full bg-[transparent] px-2 rounded-md' style={{ border: "none", outline: "none" }}
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "*This field is required.",
                                        }
                                    })}
                                />
                            </div>
                            {errors.password && <div className=' ml-12 text-red-600 text-sm font-mono'>{errors.password.message}</div>}
                        </div>
                        <button type='submit' className=' bg-orange-400 px-2 py-1 rounded-md font-mono w-24 ml-9'>Login</button>
                        <Link to='/register' className=' text-red-600 cursor-pointer ml-9 hover:text-slate-600'>Don't have Account ? Creat it !</Link>
                    </form> 
                </div>
            </div>
    )
}

export default Login;
