import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import api from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

const Searchbar = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const isEmpty = !query.trim();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const fetchResult = async () => {
        try {
            if (query.trim().length < 2) {
                setResult([]);
                return;
            }


            const res = await api.get(`/search/input?q=${query}`);
            setResult(res.data);
        } catch (error) {
            console.log("error in fetching data", error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchResult, 400);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="relative w-90 lg:w-105">

            <div className="flex items-center border rounded-full px-4 py-2 bg-white shadow-sm hover:shadow-md transition">
                <input
                    type="text"
                    value={query}
                    placeholder="Search destinations"
                    className="flex-1 outline-none text-sm bg-transparent"
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setOpen(true);
                    }
                    }
                />
                <button className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition">
                    <IoSearchOutline className="text-white text-lg" />
                </button>
            </div>


            {open && result.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-50 ">

                    {isEmpty && (
                        <p className="px-3 pt-3 text-xs text-gray-400 uppercase transition-all duration-400 ease-out">
                            Top searches
                        </p>
                    )}

                    {result.slice(0, 3).map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setOpen(false);
                                navigate(`/listing/${item._id}`);
                                setQuery("");
                            }}


                        >
                            <img
                                src={`http://localhost:8000/${item.photos[0]}`}
                                alt={item.title}
                                className="w-12 h-12 rounded-md object-cover"
                            />

                            <div>
                                <p className="font-medium text-sm">{item.title}</p>
                                <p className="text-xs text-gray-500">
                                    {item.location} • {item.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Searchbar;



