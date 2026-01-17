
import { VscAccount } from "react-icons/vsc";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import api from "../api/axios";
import Searchbar from "./searchBar";



const Header = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const timer = setTimeout(() => {

    }, 800);

    return () => clearTimeout(timer);
  }, []);



  const handleLogout = async () => {
    try {

      await api.post("/auth/logout");
      dispatch(logout());
      navigate("/")
    } catch (error) {
      console.error("Unable to logout", error);
    }
  };


  const user = useSelector((state) => state.auth.user);
  const islogined = Boolean(user);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  return (
    <header
      className="
    fixed top-0 left-0 right-0
    z-70
    bg-white
    shadow-sm
  "
    >

      <div className="hidden sm:flex items-center justify-between h-14 sm:h-20 px-3 sm:px-8">


        <img
          src={logo}
          alt="logo"
          className="h-7 sm:h-10 "
        />

        <Searchbar></Searchbar>


        <div className="flex items-center gap-2 sm:gap-4">
          {islogined && (<button className="hidden sm:block px-4 py-2 border rounded-full text-sm font-medium hover:bg-gray-100 transition 
          cursor-pointer" onClick={() => navigate("/Add-listing")}>
            Add listing
          </button>)}

          <div className="relative " ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="border rounded-full p-2 hover:shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <VscAccount className="text-lg" />
            </button>

            {open && (
              <div
                className="
        absolute right-0 mt-3
        w-52
        bg-white
        border
        rounded-xl
        shadow-lg
        overflow-hidden
        
      "
              >

                {!islogined && (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer "
                    >
                      Log in
                    </button>

                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      Sign up
                    </button>
                  </>
                )}

                {islogined && (
                  <>
                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/mylistings")}
                    >
                      My listings
                    </button>

                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/mybooking")}
                    >
                      My bookings
                    </button>


                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/wishlist")}
                    >
                      Wishlist
                    </button>


                    <hr className="my-1" />

                    <button
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"

                      onClick={() => { handleLogout() }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>


        </div>
      </div>
      {/* for mobile*/}

    <div className="flex sm:hidden items-center justify-center h-14 px-4 w-full">
        <Searchbar></Searchbar>
      </div>
    </header>
  );
};

export default Header;
