import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router";

interface LeaderboardUser {
  _id: string;
  username: string;
  totalWins: number;
  score: number;
  rank: number;
  isCurrentUser: boolean;
}

interface LeaderboardData {
  users: LeaderboardUser[];
  totalUsers: number;
}

interface LeaderboardResponse {
  status: string;
  Leaderboard: LeaderboardData;
}

const LeaderBoardList = () => {
  const { isLoading, error, data } = useQuery<LeaderboardResponse>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const response = await api.get<LeaderboardResponse>("/leaderboard");
      return response.data;
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const leaderboardUsers = data?.Leaderboard.users || [];

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return "🏆";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Spinner message="Hopefully you made it to the top 3 😎" />;
  }

  if (error) {
    console.log(error);
    return (
      <div className="px-4 mt-10">
        <p className="text-white text-center text-lg sm:text-xl md:text-2xl font-bold">
          Something went wrong! <br />
          <span className="text-sm font-normal opacity-80">
            Text Coding Ninja (@oluwatobicodes) on Twitter
          </span>
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center px-4 py-8 w-full">
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between mb-6 relative">
          <h1 className="text-3xl md:text-5xl font-black text-white text-center tracking-wider uppercase drop-shadow-md">
            Leaderboard
          </h1>
          <button
            onClick={handleGoBack}
            className="
              mb-4 md:mb-0 
              md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2
              bg-white/20 hover:bg-white text-white hover:text-[#2463FF] 
              border-2 border-white
              rounded-full px-6 py-2 
              text-[20px] cursor-pointer font-bold transition-all duration-200
            "
          >
            ← Back
          </button>
        </div>

        {leaderboardUsers.map((ele) => (
          <div
            key={ele._id} // Better to use ID than index if available
            className={`
              relative flex items-center justify-between
              px-4 py-3 sm:px-6 sm:py-4 md:px-8
              rounded-[20px] transition-transform duration-200 hover:scale-[1.02]
              ${
                ele.isCurrentUser
                  ? "bg-[#EBF2FF] border-4 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)] z-10" // Gold border for "Me"
                  : "bg-white shadow-sm"
              }
            `}
          >
            {/* Left Side: Rank + Avatar + Name */}
            <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
              {/* Rank Number */}
              <span
                className={`
                font-black text-xl sm:text-2xl md:text-3xl w-8 sm:w-10 text-center
                ${ele.rank <= 3 ? "text-[#FFD700]" : "text-[#887DC0]"}
              `}
              >
                {ele.rank}
              </span>

              {/* Avatar Circle (Added for visual flair) */}
              <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#3C74FF] text-white items-center justify-center font-bold text-lg uppercase shrink-0">
                {ele.username.charAt(0)}
              </div>

              {/* Username */}
              <h1 className="text-[#261676] text-base sm:text-lg md:text-xl font-bold truncate">
                {ele.username}
                {ele.isCurrentUser && (
                  <span className="ml-2 text-xs text-[#2463FF] bg-[#2463FF]/10 px-2 py-0.5 rounded-full">
                    YOU
                  </span>
                )}
              </h1>
            </div>

            {/* Right Side: Score + Medal */}
            <div className="flex items-center gap-3 sm:gap-6 pl-4">
              <span className="text-[#2463FF] text-lg sm:text-xl md:text-2xl font-black tracking-tight">
                {ele.score.toLocaleString()} {/* Adds commas for big numbers */}
              </span>

              {/* Fixed width container for medal to prevent jumping */}
              <div className="w-8 text-2xl sm:text-3xl text-center">
                {getRankMedal(ele.rank)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default LeaderBoardList;
