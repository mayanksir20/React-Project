import PrivateRoutes from "../Auth/PrivateRoutes";
import { BrowserRouter,Routes,useLocation,Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


import Home from "../Pages/Home";
import About from "../Pages/About";

// 🔁 Wrapper component to use location
const LayoutWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAuth = localStorage.getItem("auth");

  return (
    <>
      {/* Show Header/Footer only if NOT on login page */}
      {!isLoginPage && isAuth && <Header />}

      <Routes>
        {/* Public Route */}
        

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>

      {!isLoginPage && isAuth && <Footer />}
    </>
  );
};
 export default LayoutWrapper