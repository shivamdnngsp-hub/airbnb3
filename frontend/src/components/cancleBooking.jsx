import { useState } from "react";
import api from "../api/axios";

const CancelBooking = ({ bookingId }) => {

  const [loading, setLoading] = useState(false);

  const cancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setLoading(true);

      await api.post("/booking/cancelbooking", { bookingId });

      alert("Booking cancelled successfully");

      window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Unable to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={cancelBooking}
      className="
        px-4 py-2
        rounded-lg
        bg-[#FF385C]
        text-white
        text-sm font-medium
        hover:bg-[#E61E4D]
        active:scale-[0.98]
        transition
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      {loading ? "Cancelling..." : "Cancel booking"}
    </button>
  );
};

export default CancelBooking;
