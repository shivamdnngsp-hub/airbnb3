import Categories from "../components/categories";
import BottomMobile from "../components/bottomMobile.jsx";
import Bag from "../components/bag.jsx"
import { Outlet } from "react-router-dom";

const Home = () => {


  return (
    <>
      <Bag></Bag>
      <Categories></Categories>
      <Outlet></Outlet>
      <BottomMobile></BottomMobile>
    </>
  )
};

export default Home;
