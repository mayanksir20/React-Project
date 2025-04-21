import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../Styles/Header.css";

const Header = () => {

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email)
    }
  }, [])

  const hendaleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
    navigate("/login")
  }

  return (
    <div className="fixed-top">
      <header className="topbar">
        <div className="container">
          <div className="row">
            {/* social icon */}
            <div className="col-sm-12">
              <ul className="social-network">
                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-instagram"></i></a></li>
                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
        <div className="container">
          <a className="navbar-brand" href="index.html" style={{ textTransform: "uppercase" }}>LACODEID.COM</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/fruits">Fruits</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/seafood">Sea Food</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/vegetables">Vegetables</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>
            <div className="user ">
              
              <span>{userEmail}</span> 
            
            
            </div>
            <button onClick={hendaleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;