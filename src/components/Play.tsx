import { useEffect } from "react";
import { useParams } from "react-router";
import { useGame } from "../contexts/GameProviderFinal";
import Game from "../pages/Game";
import Spinner from "../ui/Spinner";

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
        <main className="min-h-screen bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover md:bg-cover bg-center bg-no-repeat flex items-center justify-center">
          <Spinner message="Loading Game... 😎" />
        </main>
      ) : (
        <Game />
      )}
    </div>
  );
};
export default Play;
