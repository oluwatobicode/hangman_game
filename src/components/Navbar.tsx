import { useGameContext } from "../contexts/GameProvider";

const Navbar = () => {
  const { category } = useGameContext();

  return (
    <nav className="w-full flex items-center">
      <div className="flex items-center justify-center mr-auto gap-[16px] md:gap-[32px] lg:gap-[57px]">
        <button className="cursor-pointer w-[40px] h-[40px] md:w-[64px] md:h-[64px] lg:w-[94px] lg:h-[94px] flex items-center justify-center rounded-full shadow-[inset_0_-5px_0_-1px,#9D2DF5]  bg-gradient-to-b from-[#FE71FE] to-[#7199FF]">
          <img
            className="w-[16.17px] h-[13.62px] md:w-[25.87px] md:h-[21.79px] lg:w-[38px] lg:h-[32px]"
            src="/images/icon-menu.svg"
            alt="menu icon"
          />
        </button>

        <h1 className="lg:text-[88px] md:text-[48px] text-[40px] md:tracking-[5%] leading-[-0.5%] md:leading-[120%] text-white">
          {category}
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-[16px] md:gap-[40px]">
        <div className="w-[57px] relative h-[16px] md:w-[160px] md:h-[31px] lg:w-[240px] lg:h-[31px] rounded-[96px] bg-white">
          <div className="absolute lg:w-[119px] lg:h-[13px] md:w-[65px] md:h-[13px] w-[21px] h-[8px] transform translate-y-1 translate-x-1 md:translate-y-2.5 md:translate-x-2.5 bg-[#261676] rounded-[96px]"></div>
        </div>
        <div>
          <img
            className="w-[26.16px] h-[24px] md:w-[53.33px] md:h-[48.93px]"
            src="/images/icon-heart.svg"
            alt="Heart Icon"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
