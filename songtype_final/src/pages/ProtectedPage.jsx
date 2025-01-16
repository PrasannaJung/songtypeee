import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000;

    if (Date.now() >= expiryTime) {
      return <Navigate to='/login' />;
    }

    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default ProtectedRoute;
