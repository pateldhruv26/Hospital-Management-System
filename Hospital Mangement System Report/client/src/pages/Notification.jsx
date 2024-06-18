import React from 'react'
import Navbar from '../components/Navbar'
import Footter from '../components/Footter'
import { useSelector, useDispatch} from 'react-redux'
import { Tabs, message, notification } from 'antd'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user)

    //Mark All Read notification
    const handleMarkAllRead = async() => {
        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:3002/user/get-all-notification',
                {userId:user._id},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went wrong.")
        }
    } 

    //Delte Notification 
    const handleDeleteAllRead = async() => {
        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:3002/user/delete-all-notification',
                {userId:user._id},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went wrong in Notification.")
        }
    }
  return (
    <>
        <Navbar/>
        <div className='flex flex-col h-full w-full p-14 gap-7'>
            <div className=' bg-slate-200 px-2 py-3 rounded-lg text-2xl text-center font-bold font-mono'>Notifications</div>
            <div className='h-[600px] w-[100%] bg-slate-100 rounded-lg py-6 px-7'>
                <Tabs>
                    <Tabs.TabPane tab="New" key={0}>
                        <div className='flex justify-end'>
                            <h4 className=' bg-blue-500 px-2 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-blue-600 duration-300 ease-in-out' onClick={handleMarkAllRead}>
                                Mark All Read
                            </h4>
                        </div>
                        {user?.notification.map(notificationMsg => (
                            <div onClick={navigate(notificationMsg.onClickPath)} className='cursor-pointer'>
                                <div>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        )) 
                        }
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Readed" key={1}>
                        <div className='flex justify-end'>
                            <h4 className=' bg-red-500 px-2 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-red-600 duration-300 ease-in-out' onClick={handleDeleteAllRead}>
                                Delete All Read
                            </h4>
                        </div>
                        {user?.seenNotification.map(notificationMsg => (
                            <div onClick={navigate(notificationMsg.onClickPath)} className='cursor-pointer'>
                                <div>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        )) 
                        }
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
        <Footter/>
    </>
  )
}

export default Notification
