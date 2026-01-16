import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const MyListings = () => {

  const [myListing, setMyListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyListing = async () => {
      try {
        const res = await api.get("/listing/mylistings");
        setMyListing(res.data);
      } catch (error) {
        console.log("Error fetching your listing", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListing();
  }, []);



const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this listing?."
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/listing/delete/${id}`);

    setMyListing((prev) =>
      prev.filter((item) => item._id !== id)
    );

  } catch (error) {
    console.log("Delete failed", error);
  }
};



  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading your listings...
      </div>
    );
  }


  if (myListing.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        You haven’t created any listings yet
      </div>
    );
  }

  return (

    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">


        <div className="mb-5">
          <h1 className="text-xl sm:text-3xl font-semibold text-gray-900">
            My Listings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Properties you have listed
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {myListing.map((item) => (

            <div
              key={item._id}
              onClick={() => navigate(`/listing/${item._id}`)}
              className="
                bg-white
                rounded-2xl
                overflow-hidden
                border border-gray-100
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
              "
            >

              <div className="w-full h-52 bg-gray-200">
                {item.photos?.[0] && (
                  <img
                    src={item.photos[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>


              <div className="p-4">

                <h2 className="text-sm font-semibold text-gray-900 truncate">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-500 mt-1 truncate">
                  {item.location}
                </p>

                <p className="mt-2 text-sm text-gray-900">
                  <span className="font-semibold">₹{item.price}</span>
                  <span className="text-gray-500"> / day</span>
                </p>


                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/listing/edit/${item._id}`);
                  }}
                  className="
                    mt-3
                    w-full
                    bg-rose-500 hover:bg-rose-600
                    text-white
                    text-sm
                    py-2
                    rounded-lg
                    transition
                    active:scale-95
                  "
                >
                  Edit Listing
                </button>


                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                  }}
                  className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition active:scale-95"
                >
                  Delete Listing
                </button>


              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
};

export default MyListings;
