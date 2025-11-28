import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import Spinner from "./Spinner";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { state } = useAuth();
  const location = useLocation();

  if (state.isLoading) {
    return (
      <main className="min-h-screen bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover md:bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <Spinner message="Loadinggggg your gaming experience, Star 😎" />
      </main>
    );
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
