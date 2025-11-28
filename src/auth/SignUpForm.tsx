import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import { motion } from "framer-motion";

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

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
    signUp(data);
  };

  return (
    <div className="shadow-[inset_0_6px_0_8px_#2463FF] h-[481px] w-[324px] md:w-[592px] max-h-full md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
      <div className="shadow-[inset_0_-8px_0_4px_#140E66]  flex flex-col items-center justify-center max-h-full h-[481px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
        <div className="absolute transform -translate-y-12 pt-5 top-0  md:-translate-y-20 md:translate-x-28 translate-x-17 -left-10 md:left-28">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 * 0.1 + 0.3, type: "spring" }}
            className="md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] w-[90px] h-[90px]"
            src="/images/logo.svg"
            alt="Logo for the game"
          />
        </div>

        <div className="text-white text-center">
          <h1 className="text-white text-[20px] lg:text-[40px]">Sign Up </h1>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="lg:w-[400px] lg:h-[60px] px-5 text-[20px] rounded-[20px]  bg-white"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
            />

            {errors.username?.message && (
              <p className="text-red-500 text-sm font-semibold mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              id="email"
              placeholder="Email (Optional)"
              className="lg:w-[400px] lg:h-[60px] px-5 text-[20px] rounded-[20px]  bg-white"
              {...register("email")}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="lg:w-[400px] lg:h-[60px] px-5 pr-12 text-[20px] rounded-[20px]  bg-white"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                  className="h-5 w-5"
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
              <p className="text-red-500 text-sm font-semibold mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="lg:w-[400px] lg:h-[60px] px-5 pr-12 text-[20px] rounded-[20px]  bg-white"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === checkPassword || "Passwords do not match",
              })}
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                  className="h-5 w-5"
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
              <p className="text-red-500 text-sm font-semibold mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-[400px] px-5 lg:text-[20px] text-white rounded-[20px] h-[60px] cursor-pointer transition-all duration-200 font-normal bg-[#2463FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUpForm;
