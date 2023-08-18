'use client'
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '../page';
import { Toaster } from 'sonner';
import { Form } from '@/components/Form';
import { useEffect, useState } from 'react';
import { DeleteCard } from '@/components/DeleteCard';
import axios from 'axios';
import { Card } from '@/components/Card';
import { ModCar } from '@/components/ModCar';



const DashboardPage = () => {
  const router = useRouter();
  const path  = usePathname();
  const [vehicles, setVehicles] = useState([])
  

  const renderComponent = () => {
    if(vehicles){
      switch (path) {
        case '/dashboard/fleet':
          return vehicles.map((vehicle, index )=> { return <Card key={index} vehicle={vehicle}/>})
        case '/dashboard/add':
          return <Form />;
        case '/dashboard/delete':
          return vehicles.map((vehicle, index )=> { return <DeleteCard key={index} vehicle={vehicle}/>})
        case '/dashboard/modify':
          return <ModCar vehicles={vehicles}/>
      }
    }
  };

  
const fetchVehicles = async () => {
  // setVehicles(((await axios("http://localhost:3000/api/vehicles")).data))
  setVehicles([
    {
      "idvehicle": 1,
      "plate": "Auto1",
      "brand": "ASD",
      "model": "AutoModel",
      "detail": "ASD",
      "year": 2000,
      "price_per_day": 100,
      "long_description": "ASD"
  },
  {
    "idvehicle": 2, 
    "plate": "testEliminar",
    "brand": "Toyota",
    "model": "Camry",
    "detail": "ASD",
    "year": 2000,
    "price_per_day": 1,
    "long_description": "ASD"
},
{
  "idvehicle": 53,
  "plate": "testEliminar",
  "brand": "Toyota",
  "model": "Camry",
  "detail": "ASD",
  "year": 2000,
  "price_per_day": 1,
  "long_description": "ASD"
},
{
  "idvehicle": 53,
  "plate": "testEliminar",
  "brand": "Toyota",
  "model": "Camry",
  "detail": "ASD",
  "year": 2000,
  "price_per_day": 1,
  "long_description": "ASD"
}
  ])

};
useEffect(() => {fetchVehicles()},[])

  return (
    <div className="flex items-center justify-evenly h-full">
      <Sidebar />
      <div className="lg:w-4/6 w-full pt-10 mb-10 lg:mx-10 h-auto rounded-2xl shadow-md font-poppins content-around flex-col bg-white">
        <Toaster position="bottom-right" richColors expand={false} />
        <div className="flex flex-col justify-center items-center text-2xl pb-6">
          {vehicles && renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


// const Fleets = ({cars}) => {
//   cars.
  
// }
