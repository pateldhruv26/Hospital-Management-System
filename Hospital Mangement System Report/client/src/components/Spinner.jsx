import RingLoader from "react-spinners/RingLoader";
import React from 'react'

const Spinner = () => {
  return (
    <div className="bg-[#040744] h-[100vh] w-[100vw] flex justify-center items-center">
        <RingLoader color="rgb(251 146 60)"/>
    </div>
  )
}

export default Spinner
