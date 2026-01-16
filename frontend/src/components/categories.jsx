import { useNavigate, useLocation } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const base =
    "flex flex-col items-center gap-1 cursor-pointer transition";
  const active = "text-red-500 border-b-2 border-red-500";
  const inactive = "text-gray-600 hover:text-black";

  return (
    <section className="w-full bg-white sticky top-14 sm:top-20 z-50">
      <div className="flex justify-center">
        <div className="flex gap-6 sm:gap-10 px-4 sm:px-6 py-3 overflow-x-auto scrollbar-hide">


          <div
            className={`${base} ${pathname === "/" ? active : inactive}`}
            onClick={() => navigate("/")}
          >
            <div className="text-xl sm:text-3xl">🌍</div>
            <span className="text-xs sm:text-sm">All</span>
          </div>


          <div
            className={`${base} ${pathname === "/listing/category/villa"
                ? active
                : inactive
              }`}
            onClick={() => navigate("/listing/category/villa")}
          >
            <div className="text-xl sm:text-3xl">🏡</div>
            <span className="text-xs sm:text-sm">Villa</span>
          </div>

          <div
            className={`${base} ${pathname === "/listing/category/hotel"
                ? active
                : inactive
              }`}
            onClick={() => navigate("/listing/category/hotel")}
          >
            <div className="text-xl sm:text-3xl">🏨</div>
            <span className="text-xs sm:text-sm">Hotel</span>
          </div>


          <div
            className={`${base} ${pathname === "/listing/category/beach"
                ? active
                : inactive
              }`}
            onClick={() => navigate("/listing/category/beach")}
          >
            <div className="text-xl sm:text-3xl">🏖️</div>
            <span className="text-xs sm:text-sm">Beach</span>
          </div>


          <div
            className={`${base} ${pathname === "/listing/category/pool"
                ? active
                : inactive
              }`}
            onClick={() => navigate("/listing/category/pool")}
          >
            <div className="text-xl sm:text-3xl">🏊‍♂️</div>
            <span className="text-xs sm:text-sm">Pool</span>
          </div>


          <div
            className={`${base} ${pathname === "/listing/category/room"
                ? active
                : inactive
              }`}
            onClick={() => navigate("/listing/category/room")}
          >
            <div className="text-xl sm:text-3xl">🛏️</div>
            <span className="text-xs sm:text-sm">Room</span>
          </div>


          <div
            className={`${base} ${pathname === "/listing/category/mountain"
                ? active
                : inactive
              }`}
            onClick={() => navigate("/listing/category/mountain")}
          >
            <div className="text-xl sm:text-3xl">⛰️</div>
            <span className="text-xs sm:text-sm">Mountain</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;
