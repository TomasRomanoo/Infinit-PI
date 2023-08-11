"use client";

import React from 'react'
import { Form } from "@/components/Form";
import { Toaster } from 'sonner';

const Dashboard = () => {
  return (
    <div className='flex items-center justify-around'>
        <div  className="lg:w-4/6 w-full pt-10 mb-10 lg:mx-10 h-auto rounded-2xl shadow-md font-poppins content-around flex-col bg-white" >
          <Toaster position="bottom-right" richColors expand={false} />
          <Form/>
        </div>
    </div>
  )
}

export default Dashboard