const TotalPrice = ({ date, pricePerNight }) => {
  const getNights = (startDate, endDate) => {
    if (!startDate || !endDate) return 1;
    const diff =
      new Date(endDate).getTime() - new Date(startDate).getTime();
    return Math.max(diff / (1000 * 60 * 60 * 24), 1);
  };

  const nights = getNights(
    date[0]?.startDate,
    date[0]?.endDate
  );

  const totalPrice = nights * pricePerNight;

  return (
    <div className="w-full space-y-1">
      <div className="text-lg font-semibold">
        Total price: ₹{totalPrice.toLocaleString("en-IN")}
        <span className="text-xs text-gray-600">/night</span>
      </div>
    </div>
  );
};

export default TotalPrice;
