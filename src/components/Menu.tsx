import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import MenuButton from "../ui/MenuButton";
import { useAuth } from "../contexts/AuthProvider";

const Menu = () => {
  const navigate = useNavigate();
  const { state } = useAuth();

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
    <div
      className="
      relative 
      w-[90%] max-w-[324px] md:max-w-[592px] 
      min-h-[500px] h-auto
      rounded-[72px] 
      bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50
      shadow-[inset_0_6px_0_8px_#2463FF]
      border-transparent
      flex flex-col
    "
    >
      <div
        className="
        w-full h-full flex-1
        flex flex-col items-center justify-center 
        rounded-[72px] 
        shadow-[inset_0_-8px_0_4px_#140E66]
        relative
        py-14 pb-16 
      "
      >
        <div className="absolute -top-12 md:-top-5 left-1/2 transform -translate-x-1/2 z-10 w-full flex justify-center">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 * 0.1 + 0.3, type: "spring" }}
            className="
              w-[263px] h-auto 
              md:w-[303.69px] 
              drop-shadow-lg
            "
            src="/images/logo.svg"
            alt="Logo for the game"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClickPlay}
          className="
            mt-10 md:mt-20 mb-10
            w-[140px] h-[140px] md:w-[160px] md:h-[160px] 
            flex items-center justify-center cursor-pointer rounded-full 
            bg-gradient-to-b from-[#FE71FE] to-[#7199FF]
            shadow-[inset_0px_-4px_0px_5px_#243041,inset_0px_-12px_0px_11px_#9D2DF5]
          "
        >
          <img
            src="/images/icon-play.svg"
            alt="Play-icon"
            className="w-1/3 h-1/3"
          />
        </motion.button>

        <div className="flex flex-col gap-4 w-full items-center px-4">
          {state.isAuthenticated && (
            <>
              <MenuButton onClick={handleClickProfile}>Profile</MenuButton>

              <MenuButton onClick={handleClickLeaderboard}>
                Leaderboard
              </MenuButton>
            </>
          )}

          <MenuButton onClick={handleClickRules}>How to play</MenuButton>
        </div>
      </div>
    </div>
  );
};

export default Menu;
