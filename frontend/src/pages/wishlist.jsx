import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { removeWishlist } from "../store/wishlistSlice";
import BottomMobile from "../components/bottomMobile";
import Loader from "../components/loader";

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaderItemId, setLoaderItemId] = useState(null)
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/favs/getfav");
        setWishList(res.data);
      } catch (error) {
        console.log("Error fetching wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading your wishlist...
      </div>
    );
  }

 if (wishlist.length === 0) {
  return (
  
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500 gap-3">

        <span className="text-5xl">🤍</span>

        <h2 className="text-lg font-semibold text-gray-700">
          Your wishlist is empty
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Save your favorite places to see them here later
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-3 px-5 py-2 rounded-full bg-rose-500 text-white text-sm hover:bg-rose-600 transition"
        >
          Explore Listings
        </button>

      </div>

    
  );
}


  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">

          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-900">
              Wishlist
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Places you’ve saved
            </p>
          </div>


          <div className="space-y-4">
            {wishlist.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/listing/${item.Listing._id}`)
                }
                className="
                flex
                items-center
                gap-5
                bg-white
                rounded-2xl
                border
                border-gray-100
                p-4
                hover:shadow-md
                transition
                cursor-pointer
              "
              >

                <div className="w-36 h-28 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  {item.Listing.photos?.[0] && (
                    <img
                      src={item.Listing.photos[0]}
                      alt={item.Listing.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>


                <div className="flex-1">
                  <h2 className="text-[15px] font-semibold text-gray-900">
                    {item.Listing.title}
                  </h2>

                  <p className="text-[13px] text-gray-500 mt-0.5">
                    {item.Listing.location}
                  </p>

                  <p className="mt-2 text-[14px] text-gray-900">
                    <span className="font-semibold">
                      ₹{item.Listing.price}
                    </span>
                    <span className="text-gray-500"> / day</span>
                  </p>
                </div>


                <button
                  onClick={async (e) => {
                    e.stopPropagation();

                    try {
                      setLoaderItemId(item.Listing._id)
                      await api.post("/favs/removefav", {
                        listingId: item.Listing._id,
                      });

                      setWishList((prev) =>
                        prev.filter(
                          (wish) => wish.Listing._id !== item.Listing._id
                        )
                      );
                      dispatch(removeWishlist(item.Listing._id));
                    } catch (err) {
                      console.log("Remove wishlist failed", err);
                    } finally {
                      setLoaderItemId(null);
                    }
                  }}
                  className="text-red-500 hover:scale-110 transition"
                >
                  {loaderItemId === item.Listing._id ? <Loader></Loader> : "❤️"}

                </button>

              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomMobile></BottomMobile>
    </>
  );
};

export default Wishlist;
