import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";
import Loader from "./loader";

const Reserve = ({ startDate, endDate, guests, id }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addBooking = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);

      const res = await api.post("/booking/addbooking", {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests,
        id,
      });

      if (res.data.success) {
        navigate("/mybooking");
      }

    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Reservation failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <p className="text-red-500 text-sm text-center mb-2">
          {error}
        </p>
      )}
      <button
        onClick={addBooking}
        disabled={!startDate || !endDate || loading}
        className={`w-full h-12 rounded-xl text-white font-semibold
        bg-linear-to-r from-[#FF385C] to-[#E61E4D]
        transition flex items-center justify-center
        ${!startDate || !endDate || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-[1.02] active:scale-100"}
      `}
      >
        {loading ? <Loader /> : "Reserve"}
      </button>
    </>
  );
};

export default Reserve;
