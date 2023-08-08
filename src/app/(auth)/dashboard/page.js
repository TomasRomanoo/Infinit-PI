"use client";

import React from 'react'
import { Form } from "@/components/Form";

const Dashboard = () => {
  return (
    <div className='flex items-center justify-around'>
        <div  className="lg:w-4/6 w-full pt-10 mb-10 mx-10 rounded-2xl shadow-md font-poppins content-around flex-col h-auto bg-white" >
          <Form/>
        </div>
    </div>
  )
}

export default Dashboard