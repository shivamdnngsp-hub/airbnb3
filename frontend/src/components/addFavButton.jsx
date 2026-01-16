import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { displayWishlist, removeWishlist } from "../store/wishlistSlice";
import { useNavigate } from "react-router-dom";

const AddFavButton = ({ listingId }) => {

  const user = useSelector((state) => state.auth.user);
  const islogined = Boolean(user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const wishlistIds =
    useSelector((state) => state.wishlist.ids) || [];

  const isFav = wishlistIds.includes(listingId);

  const [anim, setAnim] = useState(false);

  const handleFav = async (e) => {
    e.stopPropagation();



    try {

      if (!islogined) {
        navigate("/login")
      }


      if (isFav) {
        dispatch(removeWishlist(listingId))
        return await api.post("/favs/removefav", { listingId })

      };


      await api.post("/favs/addfav", { listingId });
      setAnim(true);
      setTimeout(() => setAnim(false), 200);
      dispatch(displayWishlist(listingId))
    } catch (err) {
      console.log("wishlist error");
    }
  };




  return (
    <button
      onClick={handleFav}
      className={`
        absolute top-3 right-3 z-20
        flex items-center justify-center
        h-8 w-8 rounded-full
        bg-black/40
        transition-transform duration-150 ease-out
        hover:scale-105
        ${anim ? "scale-110" : "scale-100"}
      `}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4.5 w-4.5"
        fill={isFav ? "#FF385C" : "none"}
        stroke="white"
        strokeWidth="1.5"
      >
        <path
          d="M12.1 21.35l-1.1-1.02C5.14 15.24 2 12.39 2 8.5
             2 5.42 4.42 3 7.5 3
             c1.74 0 3.41 0.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3
             19.58 3 22 5.42 22 8.5
             c0 3.89-3.14 6.74-8.9 11.83z"
        />
      </svg>
    </button>
  );
};

export default AddFavButton;
