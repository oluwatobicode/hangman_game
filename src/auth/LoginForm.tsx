import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

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

  const { logIn } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<loginData> = (data) => {
    console.log(data);
    try {
      logIn(data);
      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-[inset_0_6px_0_8px_#2463FF] h-[481px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
      <div className="shadow-[inset_0_-8px_0_4px_#140E66]  flex flex-col items-center justify-center h-[481px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-gradient-to-b from-[#344ABA]/50 to-[#001479]/50">
        <div className="absolute transform -translate-y-12 pt-5 top-0  md:-translate-y-20 md:translate-x-10 translate-x-17 -left-10 md:left-20">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 * 0.1 + 0.3, type: "spring" }}
            className="md:w-[373.69px] md:h-[185px] lg:w-[300.69px] lg:h-[150px] w-[263px] h-[126.72px]"
            src="/images/logo.svg"
            alt="Logo for the game"
          />
        </div>

        <div className="text-white text-center">
          <h1 className="text-white text-[20px] lg:text-[40px]">Login </h1>
          <p>Kindly login to play, you will only do this once</p>
        </div>

        <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-[200px] h-[50px] md:w-[400px] md:h-[60px] px-5 text-[20px] rounded-[20px]  bg-white"
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
              type="password"
              placeholder="Password"
              className="w-[200px] h-[50px] lg:w-[400px] lg:h-[60px] px-5 text-[20px] rounded-[20px]  bg-white"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm font-semibold mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-[200px] md:w-[400px] px-5 lg:text-[20px] text-white rounded-[20px] h-[60px] cursor-pointer transition-all duration-200 font-normal bg-[#2463FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
