// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./Layout/LayoutWrapper";
import PrivateRoutes from "./Auth/PrivateRoutes";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
function App() {
  return (

    <>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
          </Route>
        </Routes>
      
      </Router>
    </>
  );
}

export default App;
