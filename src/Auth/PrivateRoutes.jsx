import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("auth");

  return isAuth ?

    <main style={{ marginTop: "100px" }}>
      <Outlet />
    </main>

    : <Navigate to="/login" />;
};

export default PrivateRoutes;


