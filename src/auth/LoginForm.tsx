import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";

type loginData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();

  const { logIn, state } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/category";

  const onSubmit: SubmitHandler<loginData> = async (data) => {
    try {
      await logIn(data);
      toast.success("Welcome back, gamer! 🎮");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Check your username/password.");
    }
  };

  return (
    <div className="shadow-[inset_0_6px_0_8px_#2463FF] h-[520px] md:h-[500px] w-[90%] max-w-[324px] md:max-w-[592px] rounded-[40px] md:rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50 flex items-center justify-center">
      <div className="shadow-[inset_0_-8px_0_4px_#140E66] flex flex-col items-center justify-center w-full h-full rounded-[40px] md:rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50 px-6">
        <div className="absolute transform -translate-y-12 md:-translate-y-20 top-0">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="w-[120px] h-[120px] md:w-[260px] md:h-[130px] object-contain"
            src="/images/logo.svg"
            alt="Logo"
          />
        </div>

        <div className="text-white text-center mt-16 md:mt-10">
          <h1 className="text-white text-[24px] md:text-[40px] font-bold">
            Login
          </h1>
          <p className="text-[#C2D6FF] text-sm md:text-base mt-2">
            Kindly login to play, you will only do this once
          </p>
        </div>

        <form
          className="space-y-4 mt-6 w-full flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full md:w-[400px]">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-[50px] md:h-[60px] px-5 text-[18px] md:text-[20px] rounded-[20px] bg-white outline-none text-black"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Min 3 chars",
                },
              })}
            />
            {errors.username?.message && (
              <p className="text-[#FF4A4A] text-sm font-bold mt-1 ml-2 text-left">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="w-full md:w-[400px]">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[50px] md:h-[60px] px-5 text-[18px] md:text-[20px] rounded-[20px] bg-white outline-none text-black"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password?.message && (
              <p className="text-[#FF4A4A] text-sm font-bold mt-1 ml-2 text-left">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full md:w-[400px] h-[50px] md:h-[60px] text-[18px] md:text-[20px] text-white rounded-[20px] font-bold bg-[#2463FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] active:scale-95 transition-all"
          >
            {state.isLoading ? "Logging you in" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#C2D6FF] text-[20px]">
            New gamer?{" "}
            <Link
              to="/signup"
              className="text-white font-bold underline decoration-2 underline-offset-4 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
