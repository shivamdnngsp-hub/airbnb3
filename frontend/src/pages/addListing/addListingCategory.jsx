import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const categories = [
  { label: "Villa", value: "villa", icon: "🏡" },
  { label: "Room", value: "room", icon: "🛏️" },
  { label: "Hotel", value: "hotel", icon: "🏨" },
  { label: "Beach", value: "beach", icon: "🏖️" },
  { label: "Mountains", value: "mountains", icon: "⛰️" },
  { label: "Pool", value: "pool", icon: "🏊‍♂️" },
];

const AddListingCategory = ({ next }) => {
  const { setValue, watch } = useFormContext();
  const category = watch("category");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <button type="button"
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center justify-center 
                     w-10 h-10 rounded-full bg-white shadow-md 
                     hover:shadow-lg transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      </button>

      <div
        className="
          relative
          bg-white
          w-full
          sm:w-3/4
          md:w-2/3
          lg:w-105
          p-6
          rounded-xl
          shadow-lg
          min-h-[75vh]
        "
      >



        <h2 className="text-xl font-semibold text-center mb-6">
          What best describes your place?
        </h2>


        <div className="flex flex-wrap gap-4">
          {categories.map((item) => {
            const isSelected = category === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setValue("category", item.value)}
                className={`
                  basis-[calc(50%-0.5rem)]
                  h-28
                  rounded-lg
                  border
                  box-border
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  transition
                  ${isSelected
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                  }
                `}
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="font-medium">{item.label}</div>
              </button>
            );
          })}
        </div>


        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={next}
            disabled={!category}
            className="
              px-6 py-3
              rounded-lg
              font-medium
              transition
              bg-rose-500 text-white
              disabled:bg-gray-300
              disabled:text-gray-500
              disabled:cursor-not-allowed
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListingCategory;
