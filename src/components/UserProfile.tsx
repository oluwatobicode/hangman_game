import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import StatCard from "../ui/StatCard";
import { useNavigate } from "react-router";

interface Achievement {
  _id: string;
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
}

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

interface AchievementsResponse {
  status: string;
  data: {
    achievements: Achievement[];
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

  const { data: achievementsData, isLoading: isLoadingAchievements } =
    useQuery<AchievementsResponse>({
      queryKey: ["achievements"],
      queryFn: async () => {
        const response = await api.get("/achievements");
        return response.data;
      },
    });

  const allAchievements = achievementsData?.data.achievements || [];
  const user = data?.data?.user;

  const unlockedList = allAchievements.filter((ach) =>
    user?.unlockedAchievements.includes(ach.achievementId)
  );

  const lockedList = allAchievements.filter(
    (ach) => !user?.unlockedAchievements.includes(ach.achievementId)
  );

  const displayList =
    achievementFilter === "unlocked" ? unlockedList : lockedList;

  // --- Helper for Rarity Colors ---
  const getRarityColor = (rarity: string, isLocked: boolean) => {
    // If locked, use a dimmer blue border/text for rarity
    if (isLocked) return "text-[#3C74FF] border-[#3C74FF]/50 opacity-70";

    switch (rarity) {
      case "legendary":
        return "text-orange-400 border-orange-400";
      case "epic":
        return "text-purple-400 border-purple-400";
      case "rare":
        return "text-yellow-400 border-yellow-400";
      default:
        return "text-blue-300 border-blue-300"; // common
    }
  };

  if (isLoading || isLoadingAchievements) {
    return <Spinner message={`Your profile is loading. So chill 😗 `} />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10 text-xl font-bold">
        Error loading profile
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center p-4 min-h-screen items-center">
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
              text-[16px] md:text-[20px] cursor-pointer font-bold transition-all duration-200
            "
          >
            ← Back
          </button>
        </div>

        <div className="flex flex-col items-center mb-8 mt-5">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#3C74FF] border-4 border-white flex items-center justify-center overflow-hidden shadow-lg mb-3">
            <span className="text-4xl md:text-5xl font-bold uppercase">
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
                Unlocked ({unlockedList.length})
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
                Locked ({lockedList.length})
              </button>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {displayList.length === 0 && (
              <div className="col-span-1 md:col-span-2 py-10 text-center text-[#C2D6FF]/60 font-bold border-2 border-dashed border-[#3C74FF]/50 rounded-xl">
                {achievementFilter === "unlocked"
                  ? "No achievements unlocked yet. Keep playing!"
                  : "You have unlocked everything! Wow!"}
              </div>
            )}

            {displayList.map((ach) => {
              const isLocked = achievementFilter === "locked";

              return (
                <div
                  key={ach._id}
                  className={`
                    relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                    ${
                      isLocked
                        ? "bg-[#140E66]/50 border-[#3C74FF]/30 opacity-60"
                        : "bg-[#2463FF] border-white/20 shadow-lg"
                    }
                  `}
                >
                  <div
                    className={`
                    flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl border 
                    ${
                      isLocked
                        ? "bg-[#140E66]/40 border-[#3C74FF]/30"
                        : "bg-[#140E66]/40 border-white/10"
                    }
                  `}
                  >
                    {ach.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3
                        className={`font-bold text-lg truncate ${
                          isLocked ? "text-[#C2D6FF]" : "text-white"
                        }`}
                      >
                        {ach.name}
                      </h3>

                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isLocked
                            ? "bg-[#140E66] text-[#3C74FF]"
                            : "bg-[#140E66] text-yellow-300"
                        }`}
                      >
                        +{ach.points} PTS
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        isLocked ? "text-[#3C74FF]" : "text-[#C2D6FF]"
                      }`}
                    >
                      {ach.description}
                    </p>

                    <div
                      className={`
                        inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded border
                        ${getRarityColor(ach.rarity, isLocked)}
                    `}
                    >
                      {ach.rarity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
