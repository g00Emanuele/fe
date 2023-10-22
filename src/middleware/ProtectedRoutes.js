import { useNavigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Login from "../pages/Login";
import { useEffect } from "react";

const isAuth = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

const useSession = () => {
  const session = isAuth();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
  }, [navigate, session]);

  return decodedSession;
};

const ProtectedRoutes = () => {
  const auth = isAuth();
  return auth ? <Outlet /> : <Login />; //outlet è qualsiasi figlio di una protected route
};

export default ProtectedRoutes;
