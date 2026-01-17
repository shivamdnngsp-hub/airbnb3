import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import AddFavButton from "./addFavButton";
import Loader from "./loader";

const CatList = () => {

  const { cat } = useParams();
  const navigate = useNavigate();

  const [catListings, setCatListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getCatListings = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/listing/category/${cat}`);
        setCatListings(res.data);

      } catch (err) {
        console.log("Unable to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    getCatListings();

  }, [cat]);




  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-568px)]">
        <Loader />
      </div>
    );
  }


  if (catListings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-568px)] text-gray-500">
        Nothing to show in this category
      </div>
    );
  }


  return (
   <div className="px-3 sm:px-6 lg:px-8 py-4 pb-24 sm:pb-4">

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-x-4
          gap-y-6
        "
      >
        {catListings.map((catListing) => (

          <div
            key={catListing._id}
            className="cursor-pointer"
            onClick={() => navigate(`/listing/${catListing._id}`)}
          >

            
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200">

              {catListing.photos?.[0] && (
                <img
                  src={catListing.photos[0]}
                  alt={catListing.title}
                  className="w-full h-full object-cover"
                />
              )}

              <AddFavButton listingId={catListing._id} />

            </div>

            
            <div className="mt-2 leading-tight">

              <h3 className="text-[13px] font-semibold text-gray-900 truncate">
                {catListing.title}
              </h3>

              <p className="text-[13px] text-gray-500">
                {catListing.location}
              </p>

              <p className="text-[13px] text-gray-900">
                <span className="font-semibold">₹{catListing.price}</span>
                <span className="text-gray-600"> / day</span>
              </p>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CatList;
