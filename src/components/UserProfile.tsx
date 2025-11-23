import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import StatCard from "../ui/StatCard";
import { useNavigate } from "react-router";

interface AchievementWins {
  [key: string]: number;
}

type AchievementProgress = {
  categoryWins: AchievementWins;
  difficultyWins: AchievementWins;
  gamesWithoutHint: AchievementWins;
  perfectGame: AchievementWins;
};

interface User {
  _id: string;
  username: string;
  email: string;
  profile: string;
  totalWins: number;
  totalLoses: number;
  currentStreak: number;
  bestStreak: number;
  score: number;
  winRate: number;
  unlockedAchievements: string[];
  achievementProgress: AchievementProgress;
}

interface ProfileResponse {
  status: string;
  data: {
    user: User;
  };
}

const UserProfile = () => {
  const [achievementFilter, setAchievementFilter] = useState<
    "unlocked" | "locked"
  >("unlocked");

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const { error, data, isLoading } = useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get(`users/profile`);
      return response.data;
    },
  });

  const user = data?.data?.user;

  console.log(user);

  if (isLoading) {
    return <Spinner message={`Your profile is loading.So chill 😗 `} />;
  }

  if (error) {
    console.log(error);

    return (
      <div className="text-red-500 text-center">Error loading profile</div>
    );
  }

  return (
    <div className="w-full flex justify-center p-4">
      <div
        className="
        relative flex flex-col items-center
        bg-[#2463FF] text-white 
        shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] 
        rounded-[20px] md:rounded-[40px]
        w-full max-w-4xl
        p-6 md:p-10
        transition-all duration-200
      "
      >
        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between mb-6 relative">
          <h1 className="text-[24px] md:text-[40px] font-bold tracking-wider uppercase text-center w-full">
            User Profile
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
        <div className="flex flex-col items-center mb-8 mt-5">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#3C74FF] border-4 border-white flex items-center justify-center overflow-hidden shadow-lg mb-3">
            <span className="text-4xl font-bold uppercase">
              {user?.username?.charAt(0)}
            </span>
          </div>

          <h2 className="text-[28px] font-bold capitalize">{user?.username}</h2>
          <div className="flex items-center gap-2 bg-[#140E66]/30 px-4 py-1 rounded-full mt-2">
            <span className="text-lg">🔥</span>
            <p className="text-[#C2D6FF] text-sm font-bold uppercase tracking-widest">
              Current Streak:{" "}
              <span className="text-white">{user?.currentStreak ?? 0}</span>
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Score" value={user?.score ?? 0} />
          <StatCard label="Win Rate" value={`${user?.winRate ?? 0}%`} />
          <StatCard label="Total Wins" value={user?.totalWins ?? 0} />

          <StatCard label="Best Streak" value={user?.bestStreak ?? 0} />
        </div>

        <div className="w-full border-t border-[#3C74FF] pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold tracking-wide">Achievements</h2>

            <div className="flex bg-[#140E66]/40 p-1 rounded-lg">
              <button
                onClick={() => setAchievementFilter("unlocked")}
                className={`
                            px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-200
                            ${
                              achievementFilter === "unlocked"
                                ? "bg-white text-[#2463FF] shadow-sm"
                                : "text-[#C2D6FF] hover:text-white"
                            }
                        `}
              >
                Unlocked
              </button>
              <button
                onClick={() => setAchievementFilter("locked")}
                className={`
                            px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-200
                            ${
                              achievementFilter === "locked"
                                ? "bg-white text-[#2463FF] shadow-sm"
                                : "text-[#C2D6FF] hover:text-white"
                            }
                        `}
              >
                Locked
              </button>
            </div>
          </div>

          <div className="w-full h-20 border-2 border-dashed border-[#3C74FF]/50 rounded-xl flex items-center justify-center text-[#C2D6FF]/50">
            {achievementFilter === "unlocked"
              ? "Unlocked Achievements List"
              : "Locked Achievements List"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
