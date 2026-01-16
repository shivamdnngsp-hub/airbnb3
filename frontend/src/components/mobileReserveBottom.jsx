import { el } from "date-fns/locale";
import { useEffect } from "react";
import { useState } from "react";

const ReserveBar = ({ price }) => {

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  };

  const [showBar, setShowBar] = useState(true)

  useEffect(() => {

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setShowBar(false)
      }
      else { setShowBar(true) }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, [])






  return (
    (showBar && <div className="sticky bottom-0 z-1000 bg-white px-4 py-3 flex justify-between items-center shadow-md">

      <div>
        <p className="text-sm text-gray-500">Price</p>
        <span className="text-lg font-semibold text-gray-900">
          ₹{price}
          <span className="text-sm text-gray-800">/night</span>
        </span>
      </div>

      <button
        className="
      bg-[#E61E4D]
      text-white
      px-6 py-3
      rounded-xl
      font-semibold
      text-sm
      active:scale-[0.97]
      transition
      shadow
    "

        onClick={() => scrollToBottom()}
      >
        Reserve
      </button>

    </div>
    )

  )

}
export default ReserveBar