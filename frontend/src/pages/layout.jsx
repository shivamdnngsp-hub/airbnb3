import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";

const Layout = () => {
  const location = useLocation();

  const isDetailsPage = location.pathname.startsWith("/listing/");

  return (
    <>
      <div className={`${isDetailsPage ? "hidden lg:block" : "block"}`}>
        <Header />
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
