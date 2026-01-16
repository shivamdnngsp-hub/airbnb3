import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AddFavButton from "./addFavButton";
import { useSelector } from "react-redux";

const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await api.get("/listing/getlisting");
        setListings(res.data);
      } catch (err) {
        console.log("Unable to fetch listings");
      }
    };
    getListings();
  }, []);



  const user = useSelector((state) => state.auth.user)


  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4">

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
        {listings.map((listing) => (
          <div key={listing._id} className="cursor-pointer"
            onClick={() => navigate(`/listing/${listing._id}`)}
          >

            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200">
              {listing.photos && listing.photos.length > 0 && (
                <img
                  src={listing.photos[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              )}


              <AddFavButton listingId={listing._id}></AddFavButton>

            </div>




            <div className="mt-2 leading-tight">
              <h3 className="text-[13px] font-semibold text-gray-900 truncate">
                {listing.title}
              </h3>

              <p className="text-[13px] text-gray-500">
                {listing.location}
              </p>

              <p className="text-[13px] text-gray-900">
                <span className="font-semibold">₹{listing.price}</span>
                <span className="text-gray-600"> / day</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
