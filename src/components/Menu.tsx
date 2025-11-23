import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Menu = () => {
  const navigate = useNavigate();

  const handleClickPlay = () => {
    navigate("/category");
  };

  const handleClickRules = () => {
    navigate("/rules");
  };

  const handleClickLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleClickProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="shadow-[inset_0_6px_0_8px_#2463FF] h-[500px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
      <div className="shadow-[inset_0_-8px_0_4px_#140E66]  flex flex-col items-center justify-center h-[500px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
        <div className="absolute transform -translate-y-12 pt-5 top-0  md:-translate-y-20 md:translate-x-10 translate-x-17 -left-10 md:left-20">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 * 0.1 + 0.3, type: "spring" }}
            className="md:w-[373.69px] md:h-[185px] lg:w-[340.69px] lg:h-[150px] w-[263px] h-[126.72px]"
            src="/images/logo.svg"
            alt="Logo for the game"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleClickPlay}
          className="shadow-[inset_0px_-4px_0px_5px_#243041,inset_0px_-12px_0px_11px_#9D2DF5] md:w-[160px] md:h-[160px] w-[160px] h-[160px] flex items-center justify-center cursor-pointer rounded-full mt-15 mb-5 bg-gradient-to-b from-[#FE71FE] to-[#7199FF]"
        >
          <img src="/images/icon-play.svg" alt="Play-icon" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleClickProfile}
          className="mt-2 shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] text-white tracking-[5%] leading-[120%] cursor-pointer w-[260px] h-[62px] text-[32px] font-normal rounded-[40px] bg-[#2463FF]"
        >
          Profile
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleClickLeaderboard}
          className="mt-2 shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] text-white tracking-[5%] leading-[120%] cursor-pointer w-[260px] h-[62px] text-[32px] font-normal rounded-[40px] bg-[#2463FF]"
        >
          Leaderboard
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleClickRules}
          className="mt-2 shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] text-white tracking-[5%] leading-[120%] cursor-pointer w-[260px] h-[62px] text-[32px] font-normal rounded-[40px] bg-[#2463FF]"
        >
          How to play
        </motion.button>
      </div>
    </div>
  );
};

export default Menu;
