import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CancelBooking from "../components/cancleBooking";

const Mybookings = () => {
  const [mybookings, setMybookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  useEffect(() => {
    const fetchMybooking = async () => {
      try {
        const res = await api.get("/booking/mybooking");
        setMybookings(res.data);
      } catch (error) {
        console.log("Error fetching your booking", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMybooking();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading your bookings...
      </div>
    );
  }


  if (mybookings.length === 0) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500 gap-3">

        <span className="text-5xl">📭</span>

        <h2 className="text-lg font-semibold text-gray-700">
          You haven’t booked anything yet
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Start exploring and book your first stay
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-3 px-5 py-2 rounded-full bg-rose-500 text-white text-sm hover:bg-rose-600 transition"
        >
          Explore Listings
        </button>

      </div>
    </div>
  );
}


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
          My Bookings
        </h1>

        <div className="space-y-4">
          {mybookings.map((item) => {
            if (!item.listingId) return null;

            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl
                border border-gray-100 p-4 hover:shadow-md transition
                active:scale-[0.98]"
              >
                <div
                  onClick={() =>
                    navigate(`/listing/${item.listingId._id}`)
                  }
                  className="w-full sm:w-36 h-44 sm:h-28 rounded-xl overflow-hidden bg-gray-200 shrink-0 cursor-pointer"
                >
                  {item.listingId.photos?.length > 0 ? (
                    <img
                      src={item.listingId.photos[0]}
                      alt={item.listingId.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>


                <div className="flex-1">
                  <h2 className="text-base sm:text-[15px] font-semibold text-gray-900">
                    {item.listingId.title}
                  </h2>

                  <p className="text-sm sm:text-[13px] text-gray-500">
                    {item.listingId.location}
                  </p>

                  <p className="text-sm sm:text-[13px] text-gray-600 mt-1">
                    {formatDate(item.startDate)} →{" "}
                    {formatDate(item.endDate)}
                  </p>

                  <p className="mt-2 text-sm sm:text-[14px] font-semibold text-gray-900">
                    Total: ₹{item.totalPrice}
                  </p>
                </div>

                <div className="self-start sm:self-center">
                  <CancelBooking bookingId={item._id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mybookings;
