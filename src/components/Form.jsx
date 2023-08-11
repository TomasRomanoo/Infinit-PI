import axios from "axios";
import React, { useEffect, useState } from "react"
import { toast } from 'sonner';
import Options from "./Options";

export const Form = () =>{

    const handlerSubmit = (e) => {
        e.preventDefault();
    
        const fields = [
            { state: brand, setter: setBrandErr, id: "#brandInput" },
            { state: model, setter: setModelErr, id: "#modelInput" },
            { state: price, setter: setPriceErr, id: "#priceInput" },
            { state: plate, setter: setPlateErr, id: "#plateInput" },
            { state: detail, setter: setDetailErr, id: "#detailInput" },
            { state: description, setter: setDescriptionErr, id: "#descriptionInput" }
        ];
    
        fields.forEach(field => {
            if (!field.state) {
                field.setter(true);
                document.querySelector(field.id).classList.add("errInput");
            } else {
                field.setter(false);
                document.querySelector(field.id).classList.remove("errInput");
            }
        });
    
        if (!year || year.length === 0 || (year > 2023 || year < 1886)) {
            setYearErr1(!year || year.length === 0);
            setYearErr2((year > 2023 || year < 1886) && year != 0);
            document.querySelector("#yearInput").classList.add("errInput");

        } else {
            setYearErr1(false);
            setYearErr2(false);
            document.querySelector("#yearInput").classList.remove("errInput");
        }

        if(year && year.length !== 0 && (year < 2023 || year > 1886)  && fields[5].state && fields[4].state && fields[3].state && fields[2].state && fields[1].state && fields[0].state){
            createPost()
        }
    };

    const apiUrl = "http://localhost:3000/api/vehicles/"
    
    function createPost() {
        toast.promise(
            axios
            .post(apiUrl, {      
                    "plate": plate,
                    "brand": brand,
                    "model": model,
                    "detail": detail,
                    "year": + year,
                    "price_per_day":+ price,
                    "long_description": description
                }),
                {
                    loading: 'Loading...',
                    success: (data) => {
                        return `Post has been created successfully`;
                    },
                    error: 'Error while creating post',
                }
        )
    }

//* Controled inputs states
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [price, setPrice] = useState('')
    const [plate, setPlate] = useState('')
    const [year, setYear] = useState('')
    const [detail, setDetail] = useState('')
    const [description, setDescription] = useState('')

//* Error States 
    const [brandErr, setBrandErr] = useState(false)
    const [modelErr, setModelErr] = useState(false)
    const [priceErr, setPriceErr] = useState(false)
    const [plateErr, setPlateErr] = useState(false)
    const [yearErr1, setYearErr1] = useState(false)
    const [yearErr2, setYearErr2] = useState(false)
    const [detailErr, setDetailErr] = useState(false)
    const [descriptionErr, setDescriptionErr] = useState(false)



    const [foundCars, setFoundCars ] = useState([])
    const [foundBrands, setFoundBrands ] = useState([])
    const [foundModel, setFoundModel ] = useState([])

    useEffect (() => {
        axios.get(apiUrl).then((response)=> {
            setFoundCars(response.data)

            const uniqueBrands = new Set();
            response.data.forEach(car => uniqueBrands.add(car.brand))
            setFoundBrands(uniqueBrands)

        })    
    },[])

    useEffect(() => {
        const uniqueModels = new Set();
        foundCars.forEach(car => {
            if(car.brand === brand){
                uniqueModels.add(car.model)
            }
        })
        setFoundModel(uniqueModels)
    },[brand])


    return (
        <>
            <h1 className=" m-5 text-6xl font-bold font-secondary text-center ">Rent your own car!</h1> 
            <form noValidate onSubmit={handlerSubmit} class='flex items-center flex-col' >

                <div class="flex flex-col md:flex-row">
                    <div class="md:m-5">
                        <div class="m-3" >
                            <label class="block text-sm font-medium leading-6 text-gray-900">Brand</label>

                            <div class="relative mt-2 rounded-md shadow-sm">
                                <select
                                id="brandInput"
                                type="text"
                                value={brand}
                                onChange={()=>setBrand(event.target.value)}
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300">
                                    <option value="" disabled >Select some brand</option>
                                    <Options list={foundBrands}/>
                                </select>
                            </div>
                            {brandErr?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                You must choose the brand of your car  
                            </span> : <></>}
                        </div>

                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Model</label>
                            <div>
                                <select
                                id="modelInput"
                                value={model}
                                onChange={()=>setModel(event.target.value)}
                                type="text" 
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300">
                                    <option value="" disabled >Select some model</option>
                                    <Options list={foundModel}/>
                                </select>
                            </div>
                            {modelErr?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                You must choose the model of your car   
                            </span> : <></>}
                        </div>
                        
                        <hr class="mt-5 mb-5"/>

                        <div class="m-3">
                            <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price per day</label>
                            <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span class="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input 
                                id="priceInput"
                                type="number" 
                                value={price}
                                onChange={()=>setPrice(event.target.value)}
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300" 
                                placeholder="0.00"/>
                                <div class="absolute inset-y-0 right-0 flex items-center">
                                    <label  class="sr-only">Currency</label>
                                    <select class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                        <option>USD</option>
                                        <option>ARS</option>
                                        <option>EUR</option>
                                    </select>
                                </div>
                            </div>
                            {priceErr?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                The price can't be blank
                            </span> : <></>}
                        </div>

                        <hr class="mt-5 mb-5" />

                        <div class="m-3">

                            <label class="block mb-2 text-sm font-medium leading-6 text-gray-900">Upload multiple photos</label>
                            <div>
                                <label class="block">
                                    <span class="sr-only">Choose profile photo</span>
                                    <input type="file" class=" text-xs block w-full  text-gray-500 pr-2
                                    ring-2 ring-gray-300 ring-inset rounded-md
                                    file:mr-1 file:py-2 file:px-2
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white
                                    hover:file:bg-secondary file:transition-all duration-200 ease-in-out
                                    "/>
                                </label>
                            </div>
                            {/* 
                            {modelErr?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                The model can't be blank    
                            </span> : <></>} */}
                        </div>

                    </div>


                    
                    <div>
                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Plate</label>
                            <div>
                                <input
                                id="plateInput"
                                value={plate}
                                onChange={()=>setPlate(event.target.value)}
                                type="text" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"/>
                            </div>
                            {plateErr?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                Invalid plate
                            </span> : <></>}
                        </div>    


                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Year</label>
                            <div>
                                <input 
                                id="yearInput"
                                type="number" 
                                min="1886" 
                                max="2023" 
                                value={year} 
                                onChange={()=>setYear(event.target.value)}
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"/>
                            </div>
                            {yearErr1?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                The year can't be blank 
                            </span> : <></>}
                            {yearErr2?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                Invalid year
                            </span> : <></>}
                        </div>

                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Detail</label>
                            <div class="w-full max-w-sm mx-auto">
                                <textarea 
                                id="detailInput"
                                class=" block h-24 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300" 
                                placeholder="Enter your car's detail here"
                                value={detail}
                                onChange={()=>setDetail(event.target.value)}
                                ></textarea>
                            </div>
                            
                            {detailErr?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                The details can't be blank  
                            </span> : <></>}
                        </div>

                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Long Description</label>
                            <div class="w-full max-w-sm mx-auto">
                                <textarea 
                                class="h-24 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300" 
                                id="descriptionInput"
                                placeholder="Enter your description here"
                                value={description}
                                onChange={()=>setDescription(event.target.value)}
                                ></textarea>
                            </div>
                            {descriptionErr?                             
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                The description can't be blank
                            </span> : <></>}
                        </div>

                    </div>
                </div>
                                

                <div class='m-5 mb-8'>
                    <button class="rounded-xl py-3 px-5 text-white bg-primary hover:bg-secondary file:transition-all duration-200 ease-in-out">Submit</button>
                </div>
            </form>


        </>
    )
}