import { useEffect, useRef } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ListingMap from "../components/ListingMap";
import { DayPicker } from "react-day-picker";
import DatePicker from "../components/calender";
import GuestsInput from "../components/noOfGuest";
import Reserve from "../components/reserve";
import TotalPrice from "../components/totalPrice";
import ReserveBar from "../components/mobileReserveBottom";
import FullScreenLoader from "../components/fullScreenLoader";

const Details = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);



  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });



  useEffect(() => {
    const getDetails = async () => {
      try {

        const res = await api.get(`/listing/details/${id}`);
        setDetails(res.data)
        setLoading(false)
      } catch (error) {
        console.log("Unable to fetch details");
      }
    };

    getDetails();
  }, [id]);


  if (loading) {
    return (
      <FullScreenLoader />
    )
  }

  return (
    <>


      {/* for  mobile */}
      <div className="sm:hidden w-full overflow-x-hidden">

        <section className="h-80 w-full overflow-hidden">
          {details.photos && details.photos.length > 0 && (
            <img
              src={details.photos[0]}
              className="w-full h-full object-cover"
              alt="listing"
            />
          )}
        </section>

        <section className="relative z-10 rounded-t-3xl bg-white min-h-screen shadow-lg">

          <div className="flex justify-center pt-3">
            <div className="h-1 w-12 rounded-full bg-gray-300"></div>
          </div>

          <div className="px-4 pt-4 space-y-3">

            <h1 className="text-3xl font-semibold text-center">
              {details.title}
            </h1>

            <p className="text-center text-lg text-gray-800">
              In {details.location}
            </p>

            <hr className="my-3" />

            <p className="text-gray-700 leading-relaxed">
              {details.description}
            </p>

            {details.lat && details.lng && (
              <div className="mt-6 rounded-2xl overflow-hidden border">
                <div className="px-4 py-2 text-xl font-medium bg-gray-50">
                  Where you'll be
                </div>
                <ListingMap lat={details.lat} lng={details.lng} />
              </div>
            )}
          </div>

          <div className="w-full bg-white p-6 flex flex-col items-center gap-2">

            <div className="mb-3 h-10 w-full flex items-center justify-center rounded-xl shadow">
              🏷️ Prices include all fees
            </div>

            <div className="w-full bg-white rounded-xl shadow p-5 space-y-4 flex flex-col items-center">

              <TotalPrice date={date} pricePerNight={details.price} />
              <DatePicker date={date} setDate={setDate} />
              <GuestsInput guests={guests} setGuests={setGuests} />

              <Reserve
                startDate={date?.[0]?.startDate}
                endDate={date?.[0]?.endDate}
                guests={guests}
                id={details._id}
              />

            </div>
          </div>

          <ReserveBar price={details.price} />

        </section>
      </div>



      <div className="m-5 hidden sm:flex gap-8"> {/*for laptop*/}

        <section className="bg-white flex flex-col w-1/2 p-6">

          <section className="h-120 relative flex overflow-x-auto scroll-smooth rounded-2xl border ">
            {details.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                className="h-full w-full shrink-0 object-contain bg-gray-100"
              />
            ))}
          </section>

          <h1 className="text-3xl font-semibold mt-4 text-gray-900">
            {details.title}
          </h1>

          <h2 className="text-lg text-gray-600 mt-1">
            In {details.location}
          </h2>

          <hr className="my-4 border-gray-200" />

          <p className="text-base text-gray-600 leading-relaxed">
            {details.description}
          </p>

          {details.lat && details.lng && (
            <div className="mt-6 rounded-2xl overflow-hidden border">
              <div className="px-4 py-3 text-lg font-medium bg-gray-50">
                Where you’ll be
              </div>
              <ListingMap lat={details.lat} lng={details.lng} />
            </div>
          )}
        </section>


        <section className="w-[40%] flex justify-center ">
          <div className="sticky top-28 w-95 h-130 bg-white p-6  flex flex-col  items-center gap-2 ">

            <div className="mx-4 mb-3 bg-white  h-10 w-90 flex items-center justify-center rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] ">
              🏷️ Prices include all fees
            </div>



            <div className="w-90 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-5 space-y-4 flex flex-col items-center">

              <div>
                <TotalPrice
                  date={date}
                  pricePerNight={details.price}
                />
              </div>
              <DatePicker date={date} setDate={setDate} />
              <GuestsInput guests={guests} setGuests={setGuests} />
              <Reserve
                startDate={date?.[0]?.startDate}
                endDate={date?.[0]?.endDate}
                guests={guests}
                id={details._id}
              />

            </div>
          </div>
        </section>

      </div>

    </>

  );
};

export default Details;
