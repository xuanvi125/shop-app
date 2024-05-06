import { useAuth } from "../contexts/authContext";
import Fobbidden from "../pages/Forbidden";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role != "admin") {
    return <Fobbidden />;
  }
  return <>{children}</>;
}
