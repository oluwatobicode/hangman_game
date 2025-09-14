import { useNavigate } from "react-router";
import { useGameContext } from "../contexts/GameProvider";

const categories = [
  {
    name: "MOVIES",
    type: "Movies",
  },
  {
    name: "TV SHOWS",
    type: "Tv_ Shows",
  },
  {
    name: "COUNTRIES",
    type: "Countries",
  },
  {
    name: "CAPITAL CITIES",
    type: "Capital Cities",
  },
  {
    name: "ANIMALS",
    type: "Animals",
  },
  {
    name: "SPORTS",
    type: "Sports",
  },
];

const WordCategory = () => {
  const navigate = useNavigate();
  const { setSelectedCategory, setGameStatus } = useGameContext();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate("/category/game");
    setGameStatus("playing");
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A043A] via-[#151278] to-[#2b00c7]"></div>
      <div className="absolute inset-0 bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover bg-center bg-no-repeat opacity-50"></div>
      <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-7xl px-4">
        <div className="flex flex-col justify-between items-center w-full">
          <div className="flex flex-row items-center justify-between mb-8 w-full max-w-6xl">
            <button
              onClick={handleGoBack}
              className="shadow-[inset_0px_-5px_0px_-1px_#9D2DF5] bg-gradient-to-b from-[#FE71FE] to-[#7199FF] w-[40px] h-[40px] md:w-[64px] md:h-[64px] lg:w-[94px] lg:h-[94px] rounded-full flex items-center justify-center cursor-pointer"
            >
              <img
                src="/images/icon-back.svg"
                className="w-[17.45px] h-[16.17px] md:w-[27.91px] md:h-[25.87px] lg:w-[41px] lg:h-[38px]"
                alt="back-icon"
              />
            </button>

            <h1 className="text-[48px] text-center md:text-[104px] lg:text-[136px] font-medium text-transparent leading-[120%] -tracking-[0.5%] flex-1">
              <span className="bg-gradient-to-b text-stroke from-[#67B6FF] to-white bg-clip-text">
                Pick a Category
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] w-full max-w-6xl">
            {categories.map((el, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(el.name)}
                className="text-white text-[24px] md:text-[48px] tracking-[5%] leading-[120%] cursor-pointer transition-all duration-200 font-normal bg-[#2463FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] lg:w-[384px] lg:h-[190px] md:w-full md:h-[182.67px] w-full h-[77px] md:rounded-[40px] rounded-[20px]"
              >
                {el.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WordCategory;
