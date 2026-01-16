import { useFormContext } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import LocationAutocompleteOSM from "../../LocationAutocompleteOSM";
import Loader from "../../components/loader";


const AddListingDetails = ({ back, isEdit, loading, error }) => {

  const { register, setValue } = useFormContext();
  const [count, setCount] = useState(0);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <button
        type="button"
        onClick={back}
        className="absolute top-6 left-6 flex items-center justify-center 
                   w-10 h-10 rounded-full bg-white shadow-md 
                   hover:shadow-lg transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      </button>

      <div
        className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-105
                   p-6 rounded-xl shadow-lg min-h-[75vh]"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Enter details
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register("title")}
              placeholder="Beautiful villa near beach"
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>

            <LocationAutocompleteOSM
              onSelect={(data) => {
                setValue("location", data.address);
                setValue("lat", data.lat);
                setValue("lng", data.lng);
              }}
            />

            <input type="hidden" {...register("location")} />
            <input type="hidden" {...register("lat")} />
            <input type="hidden" {...register("lng")} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe your place..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos
            </label>

            <input
              type="file"
              multiple
              id="photos"
              className="hidden"
              {...register("photos", {
                onChange: (e) => setCount(e.target.files.length),
              })}
            />

            <label
              htmlFor="photos"
              className="flex items-center justify-center h-32 w-full
                         border-2 border-dashed rounded-lg cursor-pointer
                         hover:border-rose-500 transition"
            >
              {count === 0 ? (
                <span className="text-gray-500 text-sm">
                  Click to upload photos
                </span>
              ) : (
                <span className="text-rose-500 font-medium">
                  {count} photo{count > 1 ? "s" : ""} selected
                </span>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per day
            </label>
            <input
              type="number"
              {...register("price")}
              placeholder="2500"
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <p className="text-red-500 text-sm text-center mb-2">
          {error}
        </p>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg font-medium transition
                       bg-rose-500 text-white hover:bg-rose-600
                       flex items-center gap-2
                       disabled:opacity-50"
          >
            {loading && <Loader />}

            {loading
              ? "Saving..."
              : isEdit
                ? "Update Listing"
                : "Submit Listing"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddListingDetails;
