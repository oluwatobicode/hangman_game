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
  return (
    <main className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A043A] via-[#151278] to-[#2b00c7]"></div>
      <div className="absolute inset-0 bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover bg-center bg-no-repeat opacity-50"></div>
      <div className="flex flex-col items-center justify-center relative z-10">
        <h1 className="text-[48px] w-full text-center md:text-[104px] lg:text-[136px] font-medium  text-transparent leading-[120%] -tracking-[0.5%]">
          <span className=" bg-gradient-to-b text-stroke from-[#67B6FF] to-white bg-clip-text">
            How to Playyyyyymm
          </span>
        </h1>

        <div className="flex flex-row gap-[25px] mt-5">
          {rules.map((el) => (
            <div
              key={el.id}
              className="lg:w-[384px] lg:h-[550px] flex flex-col items-center justify-center space-y-3 rounded-[40px] bg-white"
            >
              <div className="text-center space-y-4 p-4">
                <h1 className="text-[88px] leading-[120%] text-[#2463FF]">
                  0{el.id}
                </h1>
                <h1 className="text-[48px] text-[#261676]">{el.name}</h1>
                <p className="text-[26px] leading-[120%] tracking-[5%] text-[#887DC0]">
                  {el.rule}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rules;
