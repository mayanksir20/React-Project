import { useState } from "react"; // useState hook ko import kar rahe hain React se to handle the state of the component
import { useNavigate } from "react-router-dom"; // useNavigate hook ko import kar rahe hain to navigate between pages
import "../styles/Login.css"; // CSS file ko import kar rahe hain for styling

const Login = () => {
  const navigate = useNavigate(); // useNavigate hook ka use kar rahe hain to navigate to other pages
  const [isRegister, setIsRegister] = useState(false); // A boolean state to toggle between register and login mode
  const [email, setEmail] = useState(""); // Email field ka state
  const [password, setPassword] = useState(""); // Password field ka state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password field (only for register mode)
  const [error, setError] = useState(""); // Error state to display error messages to the user
  const [showPopup, setShowPopup] = useState(false); // Popup show/hide ka state to display registration success message

  const handleSubmit = async (e) => { // handleSubmit function jo form ke submit hone pe call hota hai
    e.preventDefault(); // Page reload hone se rokne ke liye

    if (isRegister) { // Agar registration mode hai
      if (!email || !password || !confirmPassword) { // Agar kisi bhi field ka data nahi hai
        return setError("All fields are required."); // Error show karo
      }

      if (password !== confirmPassword) { // Agar password aur confirm password match nahi karte
        return setError("Passwords do not match."); // Error show karo
      }

      const checkRes = await fetch(`http://localhost:3001/users?email=${email}`); // Backend se check karo ki email already registered hai ya nahi
      const existingUser = await checkRes.json(); // Response ko json mein convert karo

      if (existingUser.length > 0) { // Agar user already registered hai
        return setError("Email already registered."); // Error show karo
      }

      // Agar sab kuch thik hai, toh user ko register karo
      await fetch("http://localhost:3001/users", {
        method: "POST", // POST request bhej rahe hain data ko server pe save karne ke liye
        headers: {
          "Content-Type": "application/json", // Data ko JSON format mein bhej rahe hain
        },
        body: JSON.stringify({ email, password }), // Body mein email aur password ko send kar rahe hain
      });

      setShowPopup(true); // Popup ko show karne ke liye state set kar rahe hain
    } else { // Agar login mode hai
      const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`); // Backend pe login check kar rahe hain
      const data = await res.json(); // Response ko json mein convert karo

      if (data.length > 0) { // Agar email aur password match karte hain
        localStorage.setItem("auth", true); // User ko authenticated mark karne ke liye localStorage mein set kar rahe hain
        navigate("/"); // Dashboard ya home page pe navigate kar rahe hain
      } else {
        setError("Invalid email or password"); // Agar email ya password galat hai toh error show karo
      }
    }
  };

  const handleLoginNow = () => {
    setShowPopup(false); // Hide the popup
    setIsRegister(false); // Switch to login mode
  };

  return (
    <div className={`login-container ${isRegister ? "register-mode" : ""}`}> {/* Conditional class add kar rahe hain based on register mode */}
      <div className="login_form">
        {/* Blue panel */}
        <div className="left">
          <div>
            <p>{isRegister ? "Welcome, Dear User!" : "Hello, Dear User!"}</p> {/* Dynamic message based on register mode */}
            <a href="#">
              {isRegister
                ? "Already have an account?" // Agar register mode hai toh yeh show hoga
                : "Don't have an account?"} {/* Agar login mode hai toh yeh show hoga */}
            </a><br />
            <input className="mt-2"
              type="button"
              value={isRegister ? "Login" : "Register"} // Button ka label dynamically change ho raha hai
              onClick={() => {
                setError(""); // Error ko clear kar rahe hain jab toggle kar rahe hain
                setIsRegister(!isRegister); // Register/Login toggle kar rahe hain
              }}
            />
          </div>
        </div>

        {/* Form panel */}
        <div className="right">
          <div>
            <h1>{isRegister ? "Register" : "Login"}</h1> {/* Dynamic heading based on mode */}

            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Email field ko handle kar rahe hain
                  required
                />
                <i className="fa-solid fa-user input-icon"></i>
              </div>

              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Password field ko handle kar rahe hain
                  required
                />
                <i className="fa-solid fa-lock input-icon"></i>
              </div>

              {isRegister && ( // Agar register mode hai toh confirm password field bhi show hoga
                <div className="input-wrapper">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Confirm password field ko handle kar rahe hain
                    required
                  />
                  <i className="fa-solid fa-lock input-icon"></i>
                </div>
              )}

              {!isRegister && <a href="#">Forgot Password?</a>} {/* Agar login mode hai toh forgot password ka link show hoga */}

              <button type="submit">{isRegister ? "Register" : "Login"}</button> {/* Button ka text dynamically change ho raha hai */}
              {error && <p style={{ color: "red" }}>{error}</p>} {/* Agar error hai toh red text mein show hoga */}

              <p>
                or {isRegister ? "register" : "login"} with social platforms
              </p>
              <div className="social-icons">
                <a href="#"><i className="fa-brands fa-google"></i></a>
                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i className="fa-brands fa-github"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popup after successful registration */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Welcome! You are now a registered user.</p>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
            <button onClick={handleLoginNow}>Login Now</button> {/* Login page pe redirect kar rahe hain */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
