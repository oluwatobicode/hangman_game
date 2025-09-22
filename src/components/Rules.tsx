import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const rules = [
  {
    id: 1,
    name: "Choose a category",
    rule: "First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.",
  },
  {
    id: 2,
    name: "Guess letters",
    rule: "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it's wrong, you lose some health, which empties after eight incorrect guesses.",
  },
  {
    id: 3,
    name: "Win or lose",
    rule: "You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.",
  },
];

const Rules = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <main className="min-h-screen flex items-center pb-12 justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A043A] via-[#151278] to-[#2b00c7]"></div>
      <div className="absolute inset-0 bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover bg-center bg-no-repeat opacity-50"></div>
      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="flex justify-between items-center w-full max-w-6xl">
          <div className="">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={handleGoBack}
              className="shadow-[inset_0px_-5px_0px_-1px_#9D2DF5] bg-linear-to-b from-[#FE71FE] to-[#7199FF] w-[40px] h-[40px] md:w-[64px] md:h-[64px] lg:w-[94px] lg:h-[94px] rounded-full flex items-center justify-center cursor-pointer"
            >
              <img
                src="/images/icon-back.svg"
                className="w-[17.45px] h-[16.17px] md:w-[27.91px] md:h-[25.87px] lg:w-[41px] lg:h-[38px]"
                alt="back-icon"
              />
            </motion.button>
          </div>

          <h1 className="text-[48px] w-full text-center md:text-[104px] lg:text-[136px] font-medium  text-transparent leading-[120%] -tracking-[0.5%]">
            <span className=" bg-gradient-to-b text-stroke from-[#67B6FF] to-white bg-clip-text">
              How to Play
            </span>
          </h1>
        </div>

        <div className="flex lg:flex-row flex-col gap-[25px] mt-5 w-full max-w-6xl">
          {rules.map((el, i) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
              }}
              className="lg:w-[384px] cursor-pointer lg:h-[520px] md:w-[680px] md:h-[200px] w-[324px] h-[185px] flex lg:flex-col md:flex-row items-center justify-center space-y-3 rounded-[40px] bg-white"
            >
              <div className="text-center lg:space-y-4 p-4">
                <div className="flex lg:flex-col items-center flex-row gap-[16px] md:hidden">
                  <h1 className="lg:text-[88px] text-[24px] leading-[120%] text-[#2463FF]">
                    0{el.id}
                  </h1>
                  <h1 className="lg:text-[48px] md:text-[40px] text-[24px] text-[#261676]">
                    {el.name}
                  </h1>
                </div>

                <div className="hidden lg:flex lg:flex-col items-center gap-[16px]">
                  <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                    className="lg:text-[88px] text-[24px] leading-[120%] text-[#2463FF]"
                  >
                    0{el.id}
                  </motion.h1>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:text-[48px] md:text-[40px] text-[24px] text-[#261676]"
                  >
                    {el.name}
                  </motion.h1>
                </div>

                <div className="hidden md:flex lg:hidden items-center gap-[16px]">
                  <div className="flex flex-row items-center justify-center gap-[40px]">
                    <h1 className="text-[88px] leading-[120%] text-[#2463FF] flex-shrink-0">
                      0{el.id}
                    </h1>
                    <div className="flex flex-col gap-[1px] items-start">
                      <h1 className="text-[40px] text-left text-[#261676] ">
                        {el.name}
                      </h1>
                      <p className="text-[20px] text-left leading-[120%] tracking-[5%] text-[#887DC0]">
                        {el.rule}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="lg:text-[26px] text-[16px] lg:text-center text-left leading-[120%] tracking-[5%] text-[#887DC0] md:hidden lg:block">
                  {el.rule}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rules;
