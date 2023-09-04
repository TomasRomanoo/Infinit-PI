import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { MdAddCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";

export const Category = ({ categories }) => {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [toDelete, setToDelete] = useState([]);

    
    const [showOptions, setShowOptions] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const hanlderPost = () => {
        toast.promise(axios.post(`/api/category`), {
            name: name,
            url: url,
            deleted: false,
        }),
        {
            loading: "Loading...",
            success: (data) => {
                return `Category has been created successfully`;
            },
            error: "Error while creating category",
        };
    };

    const handlerDelete = (name) => {
        Swal.fire({
            title: `Are you sure to delete the category ` + name + `?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(axios.delete(`/api/category/${name}`), {
                    loading: "Loading...",
                    success: (data) => {
                        document.querySelector(`#${id}`).classList.add("opacity-0");
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                        return `The category has been deleted successfully`;
                    },
                    error: "Error while deleting category",
                });
            }
        });
    };

    return (
        <div className={`flex flex-col items-center m-5 px-10 p-10 max-w-4xl flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5`}>
            <button><BsArrowLeftShort/></button>
            <div className={`flex-col ${showOptions? 'flex' : 'hidden'}`}>
                <button className="bg-primary flex text-neutral-50 items-center justify-evenly text-lg font-semibold rounded-xl px-2 py-3 w-full my-5" onClick={()=> {
                    setShowOptions(false)
                    setShowAdd(true)
                }}>
                    <MdAddCircle className="w-9 h-9"/>
                    Add category
                </button>
                <button className="bg-primary flex text-neutral-50 items-center justify-evenly text-lg font-semibold rounded-xl px-2 py-3 w-full my-8" onClick={()=> {
                    setShowOptions(false)
                    setShowDelete(true)
                }}> 
                    <TiDelete className="w-10 h-10"/>
                    Delete category
                </button>
            </div>


            {/* Agregar validaciones */}
            <div className={` ${showAdd ? 'flex' : 'hidden'} `}>
                <h1>Add your category!</h1>
                <form onSubmit={hanlderPost}>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Category name
                    </label>
                    <input
                        type="text"
                        className="relative mt-2 rounded-md shadow-sm"
                        value={name}
                        onChange={() => setName(event.target.value)}
                    />
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Category image
                    </label>
                    <input
                        type="url"
                        className="relative mt-2 rounded-md shadow-sm"
                        value={img}
                        onChange={() => setImg(event.target.value)}
                    />
                    <button className="bg-primary text-neutral-50 rounded-xl p-2 ml-2">
                        Guardar
                    </button>
                </form>
            </div>

            {/* <div>
                <h1>Select one category to delete</h1>
                {categories.map((category) => {
                    return (
                        <div
                            className="flex flex-col items-center justify-between"
                            id={category.id}
                            onClick={() => handlerDelete(category.id)}
                        >
                            <Image
                                width={200}
                                height={200}
                                className="object-contain rounded-md"
                                src={category.url}
                                alt="category"
                            />
                            <p className="font-poppins text-lg font-bold capitalize">
                                {category.name}
                            </p>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
};
