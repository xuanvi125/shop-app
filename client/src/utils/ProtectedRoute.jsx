import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Loading from "../pages/Loading";

function ProtectedRoute({ children }) {
  const { isAuth, isInitialize } = useAuth();
  if (!isInitialize) return <Loading />;
  if (!isAuth) return <Navigate to={"/login"} />;
  return children;
}

export default ProtectedRoute;
