import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);


  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">

        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm text-center">

          <h2 className="text-lg font-semibold text-gray-900">
            Login Required
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Please login or create an account to continue
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 w-full bg-rose-500 text-white py-3 rounded-xl"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="mt-3 w-full border border-gray-300 py-3 rounded-xl"
          >
            Sign Up
          </button>

        </div>
      </div>
    );
  }

 
  return (
    <div className="bg-gray-50 min-h-screen px-4 pt-6">

      
      <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">

        <div className="w-14 h-14 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
          {user.userName.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            {user.userName}
          </h2>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>
        </div>

      </div>


      <div className="mt-6 bg-white rounded-2xl shadow-sm">

        <div
          onClick={() => navigate("/mylistings")}
          className="px-4 py-4 border-b cursor-pointer"
        >
          My Listings
        </div>

        <div
          onClick={() => navigate("/wishlist")}
          className="px-4 py-4 border-b cursor-pointer"
        >
          Wishlist
        </div>

        <div
          onClick={() => navigate("/mybooking")}
          className="px-4 py-4 cursor-pointer"
        >
          My Bookings
        </div>

      </div>


      <button
        onClick={() => {
          dispatch(logout());
          localStorage.clear();
          navigate("/");
        }}
        className="mt-6 w-full bg-white border border-red-300 text-red-500 py-3 rounded-xl"
      >
        Logout
      </button>

    </div>
  );
};

export default Profile;
