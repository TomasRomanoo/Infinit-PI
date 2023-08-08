export const Form = () =>{
    return (
        <>
            <p className=" m-5 text-6xl font-bold font-secondary text-center ">Rent your own car!</p> 
            <form action="" class='flex items-center flex-col' >

                <div class="flex flex-col md:flex-row">
                    <div class="md:m-5">
                        <div class="m-3" >
                            <label class="block text-sm font-medium leading-6 text-gray-900">Brand</label>

                            <div class="relative mt-2 rounded-md shadow-sm">
                                <input type="text" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-in-out duration-300"/>
                            </div>
                        </div>

                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Model</label>
                            <div>
                                <input type="text" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-in-out duration-300"/>
                            </div>
                        </div>
                        
                        <hr class="mt-5 mb-5"/>

                        <div class="m-3">
                            <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price per day</label>
                            <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span class="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-in-out duration-300" placeholder="0.00"/>
                                <div class="absolute inset-y-0 right-0 flex items-center">
                                    <label for="currency" class="sr-only">Currency</label>
                                    <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                        <option>USD</option>
                                        <option>CAD</option>
                                        <option>EUR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Plate</label>
                            <div>
                                <input type="text" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-in-out duration-300"/>
                            </div>
                        </div>    


                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Year</label>
                            <div>
                                <input type="number" min="1886" max="2023" step="1" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-in-out duration-300"/>
                            </div>
                        </div>

                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Detail</label>
                            <div class="w-full max-w-sm mx-auto">
                                <textarea class=" block w-full h-24  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-in-out duration-300" placeholder="Enter your car's detail here"></textarea>
                            </div>
                        </div>

                        <div class="m-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Long Description</label>
                            <div class="w-full max-w-sm mx-auto">
                                <textarea class="h-24 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-in-out duration-300" placeholder="Enter your description here"></textarea>
                            </div>
                        </div>

                    </div>
                </div>
                                

                <div class='m-5 mb-8'>
                    <button class="rounded-full py-3 px-5 text-white bg-black">Submit</button>
                </div>
            </form>


        </>
    )
}