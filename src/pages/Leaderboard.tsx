import LeaderBoardList from "../components/LeaderboardList";

const Leaderboard = () => {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover md:bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <LeaderBoardList />
      <h3 className="text-center text-white tracking-[3px] cursor-pointer mb-10">
        <a href="https://oluwatobii.xyz" target="_blank">
          Built by Coding Ninja 🥷🏾
        </a>
      </h3>
    </main>
  );
};
export default Leaderboard;
