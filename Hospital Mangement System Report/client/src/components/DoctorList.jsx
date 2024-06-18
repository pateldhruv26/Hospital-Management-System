import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate();
  return (
    <>
        <div onClick={() => {navigate(`/doctor/book-appointment/${doctor._id}`)}} className=' flex flex-col bg-[#28328ce8] rounded-lg gap-4 hover:scale-105 duration-100 ease-in cursor-pointer'>
            <div className='w-full bg-[#FB923C] p-2 rounded-t-lg font-sans text-center font-bold text-blue-950'>
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className=' flex flex-col gap-4 text-white px-4 pb-3 pt-2'>
                <p> 
                    <b className=' text-[#d8ff49]'>Specialization :</b> {doctor.specialization}
                </p>
                <p>
                    <b className=' text-[#d8d8d8]'>Experience :</b> {doctor.experience} years
                </p>
                <p>
                    <b className=' text-[#d8d8d8]'>Fees Per Cunsaltation :</b> {doctor.feesPerCunsaltation}
                </p>
                <p>
                    <b className=' text-[#d8d8d8]'>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
                </p>
            </div>
        </div>
    </>
  )
}

export default DoctorList
