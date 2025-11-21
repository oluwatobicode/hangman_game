import LoginForm from "../auth/LoginForm";

const Login = () => {
  return (
    <main className="min-h-screen bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover md:bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <LoginForm />
    </main>
  );
};
export default Login;
