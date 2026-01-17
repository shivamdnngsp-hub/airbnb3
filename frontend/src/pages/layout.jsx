import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";

const Layout = () => {
  const location = useLocation();

  const isDetailsPage =
    location.pathname.startsWith("/listing/") &&
    !location.pathname.startsWith("/listing/category");

  return (
    <>
      <div className={`${isDetailsPage ? "hidden lg:block" : "block"}`}>
        <Header />
      </div>

    
      <div className={`${isDetailsPage ? "pt-0 lg:pt-24" : "pt-16 sm:pt-24"}`}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
