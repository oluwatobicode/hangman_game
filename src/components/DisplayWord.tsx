import { useGame } from "../contexts/GameProviderFinal";

const DisplayWord = () => {
  const { state } = useGame();
  const { secretWord } = state;

  return (
    <div>
      <h1>{secretWord}</h1>
    </div>
  );
};

export default DisplayWord;
