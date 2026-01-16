import { useState, useRef, useEffect } from "react";

const GuestsInput = ({ guests, setGuests }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const totalGuests = guests.adults + guests.children;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const updateGuest = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, prev[type] + value),
    }));
  };

  return (
    <div ref={ref} className="relative w-72">

      <div
        onClick={() => setOpen(true)}
        className="border rounded-xl px-4 py-3 cursor-pointer bg-white
        hover:bg-gray-50 transition shadow-sm"
      >
        <p className="text-sm text-gray-500">Guests</p>
        <p className="font-medium">
          {totalGuests} guest{totalGuests > 1 ? "s" : ""}
          {guests.infants > 0 && `, ${guests.infants} infant`}
        </p>
      </div>


      {open && (
        <div
          className="absolute z-50 mt-3 w-full bg-white rounded-2xl
          shadow-[0_12px_40px_rgba(0,0,0,0.18)] p-4 space-y-5"
        >
          <GuestRow
            label="Adults"
            subtitle="Ages 13+"
            value={guests.adults}
            onMinus={() => updateGuest("adults", -1)}
            onPlus={() => updateGuest("adults", 1)}
            min={1}
          />

          <GuestRow
            label="Children"
            subtitle="Ages 2–12"
            value={guests.children}
            onMinus={() => updateGuest("children", -1)}
            onPlus={() => updateGuest("children", 1)}
            min={0}
          />

          <GuestRow
            label="Infants"
            subtitle="Under 2"
            value={guests.infants}
            onMinus={() => updateGuest("infants", -1)}
            onPlus={() => updateGuest("infants", 1)}
            min={0}
          />
        </div>
      )}
    </div>
  );
};

const GuestRow = ({ label, subtitle, value, onMinus, onPlus, min }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={onMinus}
        disabled={value <= min}
        className="w-8 h-8 rounded-full border text-lg
        hover:border-black disabled:opacity-30"
      >
        −
      </button>

      <span className="w-4 text-center">{value}</span>

      <button
        onClick={onPlus}
        className="w-8 h-8 rounded-full border text-lg
        hover:border-black"
      >
        +
      </button>
    </div>
  </div>
);

export default GuestsInput;
