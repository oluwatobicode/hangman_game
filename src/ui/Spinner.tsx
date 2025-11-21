import "ldrs/ring";
import { infinity } from "ldrs";

const Spinner = () => {
  infinity.register();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <l-infinity
        size="80"
        stroke="5"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3"
        color="white"
      ></l-infinity>

      <h2 className="text-white text-xl md:text-2xl font-medium text-center max-w-md">
        Hopefully you made it to the top 3 😎
      </h2>
    </div>
  );
};

export default Spinner;
