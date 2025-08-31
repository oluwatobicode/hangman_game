// components/Menu.tsx
// import { FaPlay } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="h-[481px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#2463FF] to-[#261676] shadow-2xl flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute -top-20">
        <img
          className="w-[260px] md:w-[340px]"
          src="/images/logo.svg"
          alt="Logo for the game"
        />
      </div>

      {/* Play Button */}
      <button className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF] shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
        {/* <FaPlay className="text-white text-4xl md:text-5xl" /> */}
      </button>

      {/* How to Play Button */}
      <button className="mt-10 px-8 py-3 bg-[#2463FF] text-white font-bold rounded-full shadow-md hover:bg-[#3e7bff] transition-colors">
        HOW TO PLAY
      </button>
    </div>
  );
};

export default Menu;
