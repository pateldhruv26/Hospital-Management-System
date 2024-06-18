import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { TimePicker, DatePicker, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3002/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  //=================Available Checking==========
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:3002/user/booking-availbility",
        {
          doctorId: params.doctorId,
          date: date.format("DD-MM-YYYY"),
          time: time.format("HH:mm"),
          st: doctors.timings[0],
          et: doctors.timings[1],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        localStorage.setItem("isAvailable", true);
        return true;
      } else {
        message.error(res.data.message);
        localStorage.setItem("isAvailable", false);
        return false;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      return false;
    }
  };

  //=================Available Cheking==========
  //=================booking function===========
  const handleBooking = async () => {
    try {
      if (!date && !time) {
        return alert("Date & Time required.");
      }
      // console.log(handleAvailability());
      if (await handleAvailability()) {
        dispatch(showLoading());
        console.log(user);
        const res = await axios.post(
          "http://localhost:3002/user/book-appointment",
          {
            userId: user._id,
            patientName: user.username,
            doctorName: `${doctors.firstName}  ${doctors.lastName}`,
            doctorId: params.doctorId,
            doctorInfo: doctors,
            userInfo: user,
            date: date.format("DD-MM-YYYY"),
            time: time.format("HH:mm"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.message);
        }
      } else {
        message.error("Booking Failed. Please Try Again.");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  //=================booking function===========
  return (
    <>
      <Navbar />
      <div className=" bg-[#ECF4FF] h-[600px] w-[1200px] m-auto rounded-2xl mt-9 shadow-lg shadow-black">
        <div className="font-bold text-2xl text-center p-4 underline underline-offset-8">
          Booking Page
        </div>
        {doctors && (
          <div className=" h-[500px] px-24 py-16 flex flex-col gap-6 w-[90%] mx-auto rounded-xl">
            <div className="flex">
              <div className="font-bold text-lg">Doctor Name : </div>
              <div className="text-lg ml-2 tracking-wide">
                Dr. {doctors.firstName} {doctors.lastName}
              </div>
            </div>
            <div className="flex">
              <div className="font-bold text-lg">Fees Per Consultation : </div>
              <div className="text-lg ml-2 tracking-wide">
                ₹ {doctors.feesPerCunsaltation}
              </div>
            </div>
            <div className="flex">
              <div className="font-bold text-lg">Timing : </div>
              <div className="text-lg ml-2 tracking-wide">
                {doctors.timings && doctors.timings[0]} - {" "}
                {doctors.timings && doctors.timings[1]}
              </div>
            </div>
            <div className="flex">
              <div className="font-bold text-lg">Select Date :</div>
              <DatePicker
                className="text-lg ml-2 tracking-wide bg-transparent border-none"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  // setIsAvailable(false)
                  setDate(value);
                }}
                value={date}
              />
            </div>
            <div className="flex">
              <div className="font-bold text-lg">Select Time : </div>
              <TimePicker
                className="text-lg ml-2 tracking-wide bg-transparent border-none"
                format="HH:mm"
                onChange={(value) => {
                  // setIsAvailable(true)
                  setTime(value);
                }}
                value={time}
              />
            </div>
            <div className="flex gap-10 m-auto pt-24">
              <button
                onClick={handleAvailability}
                className=" bg-blue-600 px-7 py-2 rounded-xl hover:bg-blue-700 duration-100 ease-linear font-semibold text-white"
              >
                Check Availability
              </button>
              {localStorage.getItem("isAvailable") && (
                <button
                  onClick={handleBooking}
                  className=" bg-green-600 px-14 py-2 rounded-xl hover:bg-green-700 duration-100 ease-linear font-semibold text-white"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;
