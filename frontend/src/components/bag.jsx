import background from "../assets/baground.jpeg";

const Bag = () => {
  return (
    <section
      className="
        relative
        w-full
        min-h-[35vh]
        sm:min-h-[45vh]
        md:min-h-[55vh]
        bg-center
        bg-cover
        flex
        items-center
        justify-center
      "
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-white text-center px-6 max-w-3xl">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3">
          Find your next stay
        </h1>

        <p className="text-sm sm:text-lg opacity-90">
          Discover unique homes and unforgettable experiences
        </p>
      </div>
    </section>
  );
};

export default Bag;
