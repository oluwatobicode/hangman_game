import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router";
import toast from "react-hot-toast";

type SignUpForm = {
  username: string;
  email?: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();

  const { signUp } = useAuth();
  const checkPassword = watch("password", "");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/category";

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      await signUp(data);
      toast.success("Account created! Let's play 🚀");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed. Try a different username.");
    }
  };

  return (
    <div className="shadow-[inset_0_6px_0_8px_#2463FF] min-h-[40px] md:min-h-full w-[90%] max-w-[350px] md:max-w-[592px] rounded-[40px] md:rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50 flex items-center justify-center ">
      <div className="shadow-[inset_0_-8px_0_4px_#140E66] flex flex-col items-center justify-center w-full h-full rounded-[40px] md:rounded-[72px] border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50 px-4 md:px-8">
        <div className="absolute top-0 transform -translate-y-1/2">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="w-[90px] h-[90px] md:w-[150px] md:h-[150px]"
            src="/images/logo.svg"
            alt="Logo"
          />
        </div>

        <div className="text-white text-center mt-12 md:mt-8 mb-4">
          <h1 className="text-white text-[24px] md:text-[40px] font-bold">
            Sign Up
          </h1>
        </div>

        <form
          className="space-y-3 w-full flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full md:w-[400px]">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-[50px] md:h-[60px] px-5 text-[18px] md:text-[20px] rounded-[20px] bg-white outline-none text-black"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Min 3 chars" },
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
              type="email"
              placeholder="Email"
              className="w-full h-[50px] md:h-[60px] px-5 text-[18px] md:text-[20px] rounded-[20px] bg-white outline-none text-black"
              {...register("email")}
            />
          </div>

          <div className="w-full md:w-[400px] relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[50px] md:h-[60px] px-5 pr-12 text-[18px] md:text-[20px] rounded-[20px] bg-white outline-none text-black"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 chars" },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2463FF]"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-5.625M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            {errors.password?.message && (
              <p className="text-[#FF4A4A] text-sm font-bold mt-1 ml-2 text-left">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full md:w-[400px] relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full h-[50px] md:h-[60px] px-5 pr-12 text-[18px] md:text-[20px] rounded-[20px] bg-white outline-none text-black"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === checkPassword || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2463FF]"
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-5.625M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            {errors.confirmPassword?.message && (
              <p className="text-[#FF4A4A] text-sm font-bold mt-1 ml-2 text-left">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full md:w-[400px] h-[50px] md:h-[60px] text-[18px] md:text-[20px] text-white rounded-[20px] font-bold bg-[#2463FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] active:scale-95 transition-all mt-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 mb-2 text-center">
          <p className="text-[#C2D6FF] text-[20px]">
            Current gamer?{" "}
            <Link
              to="/login"
              className="text-white font-bold underline decoration-2 underline-offset-4 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
