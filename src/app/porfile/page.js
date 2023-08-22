"use client";

import Image from "next/image";
import { useState } from "react";



export default function Porfile(){
    
    const [email, setEmail] = useState('example@gmail.com')
    const [phone, setPhone] = useState('123456')
    const [password, setPassword] = useState('saddsasdsad')
    const [zipCode, setZipCode] = useState('4600')
    const [addres, setAddres] = useState('asdasdddadadssadadsadsdasdsdasaddssad')
    const [city, setCity] = useState('Canada')
    const [country, setCountry] = useState('Canada')
    const [identification, setIdentification] = useState('12345A')

    const [editable, setEditable] = useState(false)
    

    return(
        <div className="flex flex-col lg:flex-row mb-36 content-center">
            <div  className="flex flex-col self-center items-center w-2/3 lg:w-1/3 mb-20 lg:mb-0" >
                <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                width={300}
                height={300}
                className="rounded-full mb-10"/>
                <h1 className="font-extrabold text-6xl">Nombre <hr/>Apellido</h1>
            </div>
            <div  className="relative flex flex-col p-4 w-full lg:w-2/3 h-fit rounded-lg border-solid border-2 border-zinc-800 self-center ">
                <div className="absolute p-2 -top-6 left-10 w-fit font-semibold bg-slate-100">
                    <h1>Data general</h1>
                </div>
                <div  className="flex flex-col">
                        <div className="relative flex flex-col m-4  rounded-lg border-solid border-4 border-primary">
                            <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100 ">
                                <h2>Account information</h2>
                            </div>
                            <div className="flex flex-col lg:flex-row p-6 h-full">
                                <div className="w-full lg:w-1/3 py-3 lg:py-0">
                                    <p >Email</p>
                                    <input id="email"
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        disabled={!editable}
                                        className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary"
                                    />
                                </div>
                                <div  className=" w-full lg:w-1/3 py-3 lg:py-0">
                                    <p>Phone number</p>
                                    <input id="pNumber"
                                        value={phone}
                                        onChange={(e)=> setPhone(e.target.value)}
                                        disabled={!editable}
                                        className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary"
                                    />
                                </div>
                                <div  className="w-full lg:w-1/3 py-3 lg:py-0">
                                    <p >Password</p>
                                    <input id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e)=> setPassword(e.target.value)}
                                        disabled={!editable}
                                        className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    
                        <div  className="relative flex flex-col m-4 rounded-lg border-solid border-4 border-primary ">
                            <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100">
                                <h1>Sensitive data</h1>
                            </div>
                            <div  className="flex flex-row lg:flex-row flex-col p-5 justify-evenly">
                                <div className="relative flex flex-col my-4 w-full lg:w-2/3 rounded-lg border-solid border-2 border-zinc-800">
                                    <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100">
                                        <h1>Location</h1>
                                    </div>
                                    <div className="flex flex-col sm:flex-row p-4 h-full">
                                        <div className="w-1/2" >
                                            <div className="my-2">
                                                <p>Zip Code</p>
                                                <input id="zipCode"
                                                    value={zipCode}
                                                    onChange={(e)=> setZipCode(e.target.value)}
                                                    disabled={!editable}
                                                    className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary"
                                                />
                                            </div>
                                            <div className="my-2">
                                                <p>Addres</p>
                                                <input id="addres"
                                                    value={addres}
                                                    onChange={(e)=> setAddres(e.target.value)}
                                                    disabled={!editable}
                                                    className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary w-full sm:w-2/3"
                                                />
                                            </div>
                                        </div>
                                        <div  className="w-1/2">
                                            <div className="my-2">
                                                <p>City</p>
                                                <input id="city"
                                                    value={city}
                                                    onChange={(e)=> setCity(e.target.value)}
                                                    disabled={!editable}
                                                    className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary"
                                                />
                                            </div>
                                            <div >
                                                <p>Country</p>  
                                                <input id="country"
                                                    value={country}
                                                    onChange={(e)=> setCountry(e.target.value)}
                                                    disabled={!editable}
                                                    className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex flex-col my-4 lg:w-1/4 w-full rounded-lg border-solid border-2 border-zinc-800">
                                    <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100">
                                        <h1>Documentation</h1>
                                    </div>
                                    <div className="flex flex-col p-4 h-full justify-center	">
                                        <p>Identification</p>
                                        <input id="identification"
                                            value={identification}
                                            onChange={(e)=> setIdentification(e.target.value)}
                                            disabled={!editable}
                                            className="appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500 outline-none focus:border-b-2 focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}