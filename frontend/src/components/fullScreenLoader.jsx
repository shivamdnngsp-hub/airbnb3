const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="
        w-10 h-10
        border-4 border-gray-300
        border-t-rose-500
        rounded-full
        animate-spin
        [animation-duration:0.6s]

      ">
      </div>
    </div>
  );
};

export default FullScreenLoader;
