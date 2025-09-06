import { useNavigate } from "react-router";

const Menu = () => {
  const navigate = useNavigate();

  const handleClickPlay = () => {
    navigate("/category");
  };

  const handleClickRules = () => {
    navigate("/rules");
  };

  return (
    <div className="shadow-[inset_0_6px_0_8px_#2463FF] h-[481px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
      <div className="shadow-[inset_0_-8px_0_4px_#140E66] flex flex-col items-center justify-center h-[481px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
        <div className="absolute transform -translate-y-12 top-0  md:-translate-y-20 md:translate-x-10 translate-x-17 -left-10 md:left-20">
          <img
            className="md:w-[373.69px] md:h-[185px] lg:w-[373.69px] lg:h-[185px] w-[263px] h-[126.72px]"
            src="/images/logo.svg"
            alt="Logo for the game"
          />
        </div>

        <button
          onClick={handleClickPlay}
          className="shadow-[inset_0px_-4px_0px_5px_#243041,inset_0px_-12px_0px_11px_#9D2DF5] md:w-[200px] md:h-[200px] w-[160px] h-[160px] flex items-center justify-center cursor-pointer rounded-full mt-20 bg-gradient-to-b from-[#FE71FE] to-[#7199FF]"
        >
          <img src="/images/icon-play.svg" alt="Play-icon" />
        </button>

        <button
          onClick={handleClickRules}
          className="mt-10 shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] text-white tracking-[5%] leading-[120%] cursor-pointer w-[260px] h-[62px] text-[32px] font-normal rounded-[40px] bg-[#2463FF]"
        >
          How to play
        </button>
      </div>
    </div>
  );
};

export default Menu;
