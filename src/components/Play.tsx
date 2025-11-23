import { useEffect } from "react";
import { useParams } from "react-router";
import { useGame } from "../contexts/GameProviderFinal";
import Game from "../pages/Game";

const Play = () => {
  const { category } = useParams();
  const { state, gameStart } = useGame();

  useEffect(() => {
    if (category) {
      gameStart({ category });
    }
  }, [category]);

  return (
    <div>
      {/* While fetching, show loading */}
      {!state.secretWord ? (
        <div className="text-white text-2xl">Loading Game...</div>
      ) : (
        <Game />
      )}
    </div>
  );
};
export default Play;
