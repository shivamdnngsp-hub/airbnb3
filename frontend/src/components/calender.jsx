import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({ date, setDate }) => {
  const [open, setOpen] = useState(false);

  const pickerRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={pickerRef} className="relative w-fit">

      <div
        onClick={() => setOpen(true)}
        className="border rounded-xl px-4 py-3 cursor-pointer bg-white
hover:bg-gray-50 transition shadow-sm"

      >
        <p className="text-sm text-gray-500">Check in - Check out</p>
        <p className="font-medium">
          {date[0].startDate.toDateString()} -{" "}
          {date[0].endDate.toDateString()}
        </p>
      </div>


      {open && (
        <div className="absolute z-50 mt-3 shadow-2xl rounded-2xl bg-white  ">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            rangeColors={["#FF385C"]}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
