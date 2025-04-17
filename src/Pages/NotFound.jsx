import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
          <h1>404 - Page Not Found</h1>
          <p>Oops! The page you are looking for does not exist.</p>
    
          {/* 2️⃣ User ko wapas home page par bhejne ke liye link */}
          <Link to="/">Go Back Home</Link>
        </div>
      );
    };

export default NotFound