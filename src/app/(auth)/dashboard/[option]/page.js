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
import { Pagination } from '@/components/Pagination';



const DashboardPage = () => {
  const router = useRouter();
  const path  = usePathname();
  const [vehicles, setVehicles] = useState([])

  const VEHICLES_PER_PAGE = 6;

  const totalVehicles = vehicles.length;
  const [vehiclesPerPage, setvehiclesPerPage] = useState(VEHICLES_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * vehiclesPerPage;
  const firstIndex = lastIndex - vehiclesPerPage;

  const renderComponent = () => {
    if(vehicles){
      switch (path) {
        case '/dashboard/fleet':
          return vehicles.map((vehicle, index )=> { return <Card key={index} vehicle={vehicle}/>}).slice(firstIndex, lastIndex)
        case '/dashboard/add':
          return <Form />;
        case '/dashboard/delete':
          return vehicles.map((vehicle, index )=> { return <DeleteCard key={index} vehicle={vehicle}/>}).slice(firstIndex, lastIndex)
        case '/dashboard/modify':
          return <ModCar vehicles={vehicles} firstIndex={firstIndex} lastIndex={lastIndex}/>
      }
    }
  };

  
const fetchVehicles = async () => {
<<<<<<< HEAD
  setVehicles(((await axios("/api/vehicle")).data))
=======
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
>>>>>>> 6fe6cc1fef15d3c9eb81930828e9fb52510bf964

};
useEffect(() => {fetchVehicles()},[])

  return (
    <div  className="flex  items-center justify-evenly h-full">
      <Sidebar />
      <div className="lg:w-4/6 w-full py-10 lg:mx-10 h-auto rounded-2xl shadow-md font-poppins content-around flex-col bg-white">
        <Toaster position="bottom-right" richColors expand={false} />
        <div className='flex flex-wrap justify-around	pb-10' >
          {vehicles && renderComponent()}
        </div>
{       

          !('/dashboard/add' == path) && <Pagination
          currentPage={currentPage}
          vehiclesPerPage={vehiclesPerPage}
          setCurrentPage={setCurrentPage}
          totalVehicles={totalVehicles}
        />}
      </div>
    </div>
  );
};

export default DashboardPage;

