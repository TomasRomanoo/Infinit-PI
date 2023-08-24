'use client'
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '../page';
import { Toaster } from 'sonner';
import { Form } from '@/components/Form';
import { useEffect, useState } from 'react';
import { DeleteCard } from '@/components/DeleteCard';
import axios from 'axios';
import { ModCar } from '@/components/ModCar';
import { Pagination } from '@/components/Pagination';
import { DashCard } from '@/components/DashCard';



const DashboardPage = () => {
  const router = useRouter();
  const path  = usePathname();
  const [vehicles, setVehicles] = useState([])

  
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [detail, setDetail] = useState("");
  const [description, setDescription] = useState("");

  const VEHICLES_PER_PAGE = 6;

  // console.log("Total vehicles: ", vehicles.length);
  const totalVehicles = vehicles.length;
  const [vehiclesPerPage, setvehiclesPerPage] = useState(VEHICLES_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * vehiclesPerPage;
  const firstIndex = lastIndex - vehiclesPerPage;

  const renderComponent = () => {
    if(vehicles){
      switch (path) {
        case '/dashboard/fleet':
          return vehicles.map((vehicle, index )=> { return <DashCard key={index} vehicle={vehicle}/>}).slice(firstIndex, lastIndex)
        case '/dashboard/add':
          return <Form />;
        case '/dashboard/delete':
          return vehicles.map((vehicle, index )=> { return <DeleteCard key={index} vehicle={vehicle}/>}).slice(firstIndex, lastIndex)
        case '/dashboard/modify':
          // return <ModCar vehicles={vehicles} firstIndex={firstIndex} lastIndex={lastIndex}/>
          return vehicles.map((vehicle,index)=> 
          {<ModCar 
            key={index}
            model={vehicle.model}
            brand={vehicle.brand}
            year={ vehicle.year}
            plate={ vehicle.plate}
            price_per_day={vehicle.price}
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            />
          })
      }
    }
  };

  
const fetchVehicles = async () => {
  setVehicles(((await axios.get("http://localhost:3000/api/vehicle")).data))
//   setVehicles([
//     {
//       "idvehicle": 1,
//       "plate": "Auto1",
      
//       "model": {
//         name:"AutoModel",
//         brand:{
//           name:'brandxd'
//         }
//       },
//       "detail": "ASD",
//       "year": 2000,
//       "price_per_day": 100,
//       "long_description": "ASD"
//   },
//   {
//     "idvehicle": 1,
//     "plate": "Auto1",
    
//     "model": {
//       name:"AutoModel",
//       brand:{
//         name:'brandxd'
//       }
//     },
//     "detail": "ASD",
//     "year": 2000,
//     "price_per_day": 100,
//     "long_description": "ASD"
// },    
// {
//   "idvehicle": 1,
//   "plate": "Auto1",
  
//   "model": {
//     name:"AutoModel",
//     brand:{
//       name:'brandxd'
//     }
//   },
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 100,
//   "long_description": "ASD"
// },    
// {
//   "idvehicle": 1,
//   "plate": "Auto1",
  
//   "model": {
//     name:"AutoModel",
//     brand:{
//       name:'brandxd'
//     }
//   },
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 100,
//   "long_description": "ASD"
// },    
// {
//   "idvehicle": 1,
//   "plate": "Auto1",
  
//   "model": {
//     name:"AutoModel",
//     brand:{
//       name:'brandxd'
//     }
//   },
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 100,
//   "long_description": "ASD"
// },
// {
//   "idvehicle": 1,
//   "plate": "Auto1",
  
//   "model": {
//     name:"AutoModel",
//     brand:{
//       name:'brandxd'
//     }
//   },
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 100,
//   "long_description": "ASD"
// },    {
//   "idvehicle": 1,
//   "plate": "Auto1",
  
//   "model": {
//     name:"AutoModel",
//     brand:{
//       name:'brandxd'
//     }
//   },
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 100,
//   "long_description": "ASD"
// },    {
//   "idvehicle": 1,
//   "plate": "Auto1",
  
//   "model": {
//     name:"AutoModel",
//     brand:{
//       name:'brandxd'
//     }
//   },
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 100,
//   "long_description": "ASD"
// },
  // ])

  try{
    const gettingVehicles = await axios("/api/vehicle")
    console.log("gettingVehicles: ", gettingVehicles.data) // ACA TRAE TODA LA INFO DE LA API PERO NO SE ESCRIBE EN SETVEHICLES
    setVehicles(gettingVehicles.data)
    console.log("Vehicles", vehicles)       

  } catch (error) {
      console.error("Error fetching vehicles:", error);
    }

//   setVehicles([
//     {
//       "idvehicle": 1,
//       "plate": "Auto1",
//       "brand": "ASD",
//       "model": "AutoModel",
//       "detail": "ASD",
//       "year": 2000,
//       "price_per_day": 100,
//       "long_description": "ASD"
//   },
//   {
//     "idvehicle": 2, 
//     "plate": "testEliminar",
//     "brand": "Toyota",
//     "model": "Camry",
//     "detail": "ASD",
//     "year": 2000,
//     "price_per_day": 1,
//     "long_description": "ASD"
// },
// {
//   "idvehicle": 53,
//   "plate": "testEliminar",
//   "brand": "Toyota",
//   "model": "Camry",
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 1,
//   "long_description": "ASD"
// },
// {
//   "idvehicle": 53,
//   "plate": "testEliminar",
//   "brand": "Toyota",
//   "model": "Camry",
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 1,
//   "long_description": "ASD"
// },
// {
//   "idvehicle": 53,
//   "plate": "testEliminar",
//   "brand": "Toyota",
//   "model": "Camry",
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 1,
//   "long_description": "ASD"
// },
// {
//   "idvehicle": 53,
//   "plate": "testEliminar",
//   "brand": "Toyota",
//   "model": "Camry",
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 1,
//   "long_description": "ASD"
// },
// {
//   "idvehicle": 53,
//   "plate": "testEliminar",
//   "brand": "Toyota",
//   "model": "Camry",
//   "detail": "ASD",
//   "year": 2000,
//   "price_per_day": 1,
//   "long_description": "ASD"
// }])
    
  };
    useEffect(() => {fetchVehicles()},[])

    console.log("Vehicles in state:", vehicles, vehicles.length);

    const setParameters = (vehicle) => {
    setId(vehicle.idvehicle);
    setBrand(vehicle.brand);
    setModel(vehicle.model);
    setPrice(vehicle.price_per_day);
    setPlate(vehicle.plate);
    setYear(vehicle.year);
    setDetail(vehicle.detail);
    setDescription(vehicle.long_description);
  };
  console.log("vehicles.length: ",vehicles.length)
    useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      for (let i = 0; i < vehicles.length; i++) {

        setParameters(vehicles[i]); // Pass the first vehicle for demonstration, adjust this as needed
      }
    }
  }, [vehicles]);
    
    console.log("id: ",id)
    console.log("Brand: ", brand)
    console.log("model: ", model)
    console.log("price_per_day: ", price)
    console.log("plate: ", plate)
    console.log("year: ", year)

  return (
  <div className="flex items-center justify-evenly h-full">
    <Sidebar />
    <div className="lg:w-4/6 w-full py-10 lg:mx-10 h-auto rounded-2xl shadow-md font-poppins content-around flex-col bg-white">
      <Toaster position="bottom-right" richColors expand={false} />
      <div className="flex flex-wrap justify-around pb-10">
        {vehicles && vehicles.length > 0 ? renderComponent() : null}
      </div>
      {!('/dashboard/add' == path) && (
        <Pagination
          currentPage={currentPage}
          vehiclesPerPage={vehiclesPerPage}
          setCurrentPage={setCurrentPage}
          totalVehicles={totalVehicles}
        />
      )}
    </div>
  </div>
);

};

export default DashboardPage;

