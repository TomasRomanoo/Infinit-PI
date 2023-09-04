import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { MdAddCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

export const Category = ({ setShowCategory }) => {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [categories, setCategories] = useState([]);

    const [showOptions, setShowOptions] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [errNameCategory, setErrNameCategory] = useState(false);

    const resetStates = () => {
        setShowAdd(false);
        setShowDelete(false);
        setShowOptions(true);
        setErrNameCategory(false)
        setName('')
        setImg('')
    }

    const handlerNameChange = (event) => {
        const newValue = event.target.value.replace(" ", "-");
        setName(newValue);
    };

    const handlerPost = async (e) => {
        e.preventDefault()

        if (name == null || !name || name.length === 0) {
            setErrNameCategory(true)
        } else {
            setErrNameCategory(false)
        }

        if (!(name == null || !name || name.length === 0)) {
            e.preventDefault();
            toast.promise(axios.post("/api/category", {
                name: name,
                url: img,
                deleted: false,
            }),
                {
                    loading: "Loading...",
                    success: (data) => {
                        return `Category has been created successfully`;
                    },
                    error: "Error while creating category",
                });
        }
    };
    const handlerDeleteButton = async (e) => {
        setShowOptions(false);
        setShowDelete(true);

        const res = await axios("/api/category");
        setCategories(res.data);
    };

    const handlerDelete = (name) => {
        console.log(name);
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

                        setCategories(
                            categories.filter((category) => category.name != name)
                        );

                        return `The category has been deleted successfully`;
                    },
                    error: "Error while deleting category",
                });
            }
        });
    };

    return (
        <div
            className={`flex flex-col items-center m-5 px-10 pb-17 p-10 max-w-2xl flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5`}
        >
            <div
                className={`flex flex-row text-center content-center items-center ${showAdd || showDelete ? "justify-between" : "justify-end"} w-full`}
            >
                <button
                    className={`self-start p-1 ${showAdd || showDelete ? "flex" : "hidden"}`}
                    onClick={(e) => {
                        resetStates()
                    }}
                >
                    <BsArrowLeftShort className="w-7 h-7" />
                </button>
                <button
                    className="self-end p-2"
                    onClick={(e) => {
                        setShowCategory(false);
                        resetStates();
                    }}
                >
                    <AiOutlineClose className="w-5 h-5" />
                </button>
            </div>
            <div className={`flex-col ${showOptions ? "flex" : "hidden"}`}>
                <button
                    className="bg-primary flex text-neutral-50 items-center justify-evenly text-lg font-semibold rounded-xl px-2 py-3 w-full my-5"
                    onClick={() => {
                        setShowOptions(false);
                        setShowAdd(true);
                    }}
                >
                    <MdAddCircle className="w-9 h-9" />
                    Add category
                </button>
                <button
                    className="bg-primary flex text-neutral-50 items-center justify-evenly text-lg font-semibold rounded-xl px-3 py-3 w-full my-8"
                    onClick={handlerDeleteButton}
                >
                    <TiDelete className="w-10 h-10" />
                    Delete category
                </button>
            </div>

            <div className={`flex-col ${showAdd ? "flex" : "hidden"} `}>
                <h1 className="font-semibold text-4xl">Add your category!</h1>
                <form onSubmit={handlerPost} className="flex flex-col">
                    <div className="my-5">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Category name
                        </label>
                        <input
                            type="text"
                            className={`block mt-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black focus:outline-none transition ease-in-out duration-300 ${errNameCategory ? 'ring-red-600' : 'ring-gray-300'} `}
                            value={name}
                            onChange={handlerNameChange}
                        />
                        {errNameCategory &&
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                You must enter a name to be able to create the category
                            </span>}
                    </div>
                    <div className="my-5">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Category image
                        </label>
                        <input
                            type="text"
                            className="block mt-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black focus:outline-none transition ease-in-out duration-300"
                            value={img}
                            onChange={() => setImg(event.target.value)}
                        />
                        <span className="flex items-center font-medium tracking-wide text-gray-300 text-xs mt-1 ml-1">
                            * For now, the image link should be <br/> from wikipedia (upload.wikimedia.org).
                        </span>
                    </div>
                    <button className="bg-primary text-neutral-50 rounded-xl my-5 p-2">
                        Guardar
                    </button>
                </form>
            </div>

            <div className={`flex-col ${showDelete ? "flex" : "hidden"} `}>
                <h1 className="font-semibold text-4xl text-center">
                    Select one category <br /> to delete
                </h1>
                <div className="flex flex-wrap justify-center my-10">
                    {categories.map((category) => {
                        return (
                            <div
                                className={`flex flex-col items-center justify-between relative border-solid border-2 w-44 hover:scale-110 h-24 bg-cover bg-center border-stone-950 hover:border-red-800 hover:bg-red-600 hover:font-bold rounded m-2 ease-out duration-300
                                before:bg-black before:hover:bg-red-600 before:content-{''} before:w-full before:h-full before:absolute before:opacity-30 before:hover:opacity-50`}
                                id={category.id}
                                onClick={() => handlerDelete(category.name)}
                                style={{
                                    backgroundImage: `url(${category.url})`,
                                }}
                            >
                                <p className="font-poppins text-lg capitalize absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white drop-shadow-lg z-10 ">
                                    {category.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
