import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import Spinner from "../ui/Spinner";

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

  const leaderboardUsers = data?.Leaderboard.users || [];

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return { emoji: "🏆" };
      case 2:
        return { emoji: "🥈" };
      case 3:
        return { emoji: "🥉" };

      default:
        return { emoji: "" };
    }
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className="px-4">
        <p className="text-white text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Something might have gone wrong, text Coding Ninja (@oluwatobicodes)
          on twitter
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Leaderboard
        </h1>
      </div>

      <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {leaderboardUsers.map((ele, i) => (
          <div
            className={`flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-3 sm:px-4 md:px-10 ${
              ele.isCurrentUser ? "bg-red-400" : "bg-white"
            } w-full h-16 sm:h-20 md:h-24 lg:h-28 rounded-[10px]`}
            key={i}
          >
            <span className="text-[#2463FF] text-lg sm:text-xl md:text-2xl lg:text-5xl font-semibold min-w-[30px] sm:min-w-[40px] md:min-w-[50px]">
              {ele.rank}
            </span>
            <h1 className="text-[#261676] text-base sm:text-lg md:text-xl lg:text-3xl font-medium truncate flex-1">
              {ele.username}
            </h1>
            <span className="text-[#887DC0] text-base sm:text-lg md:text-xl lg:text-3xl font-semibold">
              {ele.score}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl ml-2">
              {getRankMedal(ele.rank).emoji}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
};

export default LeaderBoardList;
