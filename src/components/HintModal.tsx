import { motion } from "framer-motion";
import { useGame } from "../contexts/GameProviderFinal";

const HintModal = () => {
  const { state, showHint } = useGame();

  const handleClose = () => {
    showHint(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg"
      >
        <div className="relative bg-white rounded-[20px] p-8 md:p-12 flex flex-col items-center text-center shadow-2xl">
          {/* Title */}
          <h2 className="text-[#2463FF] text-[32px] md:text-[40px] font-bold leading-tight mb-6 uppercase tracking-wider">
            Game Hint
          </h2>

          <p className="text-[#261676] text-[18px] md:text-[30px] font-medium leading-relaxed mb-8">
            {state.gameStart?.hint || "No hint available for this word."}
          </p>

          <p className="text-[#261676]/60 text-[14px] md:text-[22px] font-bold uppercase tracking-widest mb-2">
            Note:
          </p>
          <p className="text-[#261676]/60 text-[16px] md:text-[20px] mb-8">
            You can only use 1 hint per game.
          </p>

          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-4 right-4 group p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#261676"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#261676"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HintModal;
