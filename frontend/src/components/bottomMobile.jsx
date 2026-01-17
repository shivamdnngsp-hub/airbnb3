import { VscAccount } from "react-icons/vsc";
import { MdAddHome } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const BottomMobile = () => {
    const navigate = useNavigate()
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lex sm:hidden bg-white h-17.5 justify-between items-center px-10 border-t">



            <button
                className="border rounded-full p-2 hover:shadow-md transition flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/wishlist")}
            >
                <CiHeart className="text-lg" />
            </button>




            <button
                className="border rounded-full p-2 hover:shadow-md transition flex items-center gap-2 cursor-pointer "
                onClick={() => navigate("/Add-listing")}
            >
                <MdAddHome className="text-lg" />
            </button>




            <button
                className="border rounded-full p-2 hover:shadow-md transition flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/profile")}
            >
                <VscAccount className="text-lg" />
            </button>


        </div>
    )


}
export default BottomMobile