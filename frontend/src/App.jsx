import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./api/axios";


import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddListing from "./pages/addListing/addListing.jsx";

import { onlogin, logout } from "./store/authSlice";
import Details from "./pages/details.jsx";
import Layout from "./pages/layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CatList from "./components/CatList.jsx";
import Listings from "./components/listings.jsx";
import Wishlist from "./pages/wishlist.jsx";
import { setWishlistIds } from "./store/wishlistSlice";
import MyListings from "./pages/myListing.jsx";
import Mybookings from "./pages/bookings.jsx";
import Profile from "./pages/profile.jsx";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        console.log(res.data)
        dispatch(onlogin(res.data));
      } catch (err) {
        dispatch(logout());
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/favs/getfav");

        const wishlistIds = res.data.map(
          (item) => item.Listing._id
        );

        dispatch(setWishlistIds(wishlistIds));
      } catch (error) {
        console.log("Error fetching wishlist", error);
      }
    };

    fetchWishlist();
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={<Home />}>

            <Route index element={<Listings />} />
            <Route path="/listing/category/:cat" element={<CatList />} />

          </Route>
          <Route path="/listing/:id" element={<Details />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/mybooking" element={<Mybookings />} />
        </Route>
        <Route path="/listing/edit/:id" element={<AddListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Add-listing" element={<AddListing />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
