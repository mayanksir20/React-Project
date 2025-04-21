import { useState } from "react"; // Import React's useState hook to manage state
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for routing to other pages
import "../styles/Login.css"; // Import custom styles for login page

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate function to programmatically navigate to other pages

  // ----------- States -----------
  const [isRegister, setIsRegister] = useState(false); // State to toggle between login and registration modes
  const [email, setEmail] = useState(""); // State for storing user email input
  const [password, setPassword] = useState(""); // State for storing user password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for storing confirm password (only for registration)
  const [error, setError] = useState(""); // State to store and display error messages
  const [fName, setfName] = useState(""); // State for storing user email input
  const [lName, setlName] = useState(""); // State for storing user email input
  // State for the pop-up window that appears after registration
  const [showPopup, setShowPopup] = useState(false);

  // ----------- Forgot password pop-up ---------
  const [showForgotPopup, setShowForgotPopup] = useState(false); // State to show/hide forgot password pop-up
  const [resetEmail, setResetEmail] = useState(""); // State to store email input for password reset
  const [resetPassword, setResetPassword] = useState(""); // State to store new password for password reset
  const [resetConfirmPassword, setResetConfirmPassword] = useState(""); // State to store confirm password for reset
  const [resetMessage, setResetMessage] = useState(""); // State to show success/error messages for password reset

  // Toggle visibility of password field (show/hide password)
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword); // Toggle password visibility

  // ----------- Form submission handler ---------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    setError(""); // Reset any previous errors

    // Handle registration flow
    if (isRegister) {
      if (!fName || !lName || !email || !password || !confirmPassword) {
        return setError("All fields are required."); // Ensure that all fields are filled
      }

      if (password !== confirmPassword) {
        return setError("Passwords do not match."); // Ensure passwords match
      }

      // Check if the user already exists by matching email
      const checkRes = await fetch(`http://localhost:3001/users?email=${email}`);
      const existingUser = await checkRes.json();

      if (existingUser.length > 0) {
        return setError("Email already registered."); // Show error if email already exists
      }

      // Send POST request to register the new user
      await fetch("http://localhost:3001/users", {
        method: "POST", // Using POST to save the user
        headers: { "Content-Type": "application/json" }, // Set content type to JSON
        body: JSON.stringify({fName, lName, email, password }), // Send email and password to the backend
      });

      setShowPopup(true); // Show the success pop-up after registration
    } else {
      // Handle login flow
      const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem("auth", true); // Set user authentication status in localStorage
        localStorage.setItem("userEmail", data[0].email); // 👈 Store the user email
        localStorage.setItem("First Name", data[0].fName); // 👈 Store the First Name
        localStorage.setItem("Last Name", data[0].lName); // 👈 Store the Last Name
        navigate("/"); // Redirect to the home page/dashboard after successful login
      } else {
        setError("Invalid email or password"); // Show error if email or password is incorrect
      }
    }
  };

  // ----------- Forgot password handler -----------
  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Validation check for empty fields
    if (!resetEmail || !resetPassword || !resetConfirmPassword) {
      return setResetMessage("Please fill all fields"); // Show message if fields are empty
    }

    // Ensure new password and confirm password match
    if (resetPassword !== resetConfirmPassword) {
      return setResetMessage("Passwords do not match"); // Show message if passwords don't match
    }

    try {
      // Fetch the user from the backend using email
      const res = await fetch(`http://localhost:3001/users?email=${resetEmail}`);
      const users = await res.json();

      if (users.length === 0) {
        return setResetMessage("Email not found"); // Show message if email doesn't exist
      }

      const user = users[0];

      // Send PATCH request to update the password for the user
      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH", // Use PATCH to update an existing resource
        headers: { "Content-Type": "application/json" }, // Set content type to JSON
        body: JSON.stringify({ password: resetPassword }), // Update the user's password
      });

      setResetMessage("Password updated successfully!"); // Success message after password update
      setResetEmail(""); // Clear email field
      setResetPassword(""); // Clear new password field
      setResetConfirmPassword(""); // Clear confirm password field

      // Close the pop-up after 1.5 seconds
      setTimeout(() => {
        setShowForgotPopup(false);
        setResetMessage(""); // Clear reset message
      }, 1500);
    } catch (err) {
      console.error(err);
      setResetMessage("Something went wrong"); // Show error message in case of failure
    }
  };

  // ----------- After registration success, navigate to login page -----------
  const handleLoginNow = () => {
    setShowPopup(false); // Close the registration success pop-up
    setIsRegister(false); // Switch to login mode
  };






  return (
    <>
      {/* Login/Register container (it changes based on isRegister state) */}
      <div className={`login-container ${isRegister ? "register-mode" : ""}`}>
        <div className="login_form">
          {/* Left panel (description and toggle button for switching between login/register) */}
          <div className="left">
            <div>
              <p>{isRegister ? "Welcome, Dear User!" : "Hello, Dear User!"}</p>
              <a href="#">{isRegister ? "Already have an account?" : "Don't have an account?"}</a><br />
              <input
                className="mt-2"
                type="button"
                value={isRegister ? "Login" : "Register"} // Toggle button between login and register
                onClick={() => {
                  setError(""); // Clear error when switching between modes
                  setIsRegister(!isRegister); // Toggle the mode
                }}
              />
            </div>
          </div>

          {/* Right panel (form for login or registration) */}
          <div className="right">
            <h1>{isRegister ? "Register" : "Login"}</h1>
            <form onSubmit={handleSubmit}>

              {isRegister && (
                <div className="input-wrapper name-inputs">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={fName}
                    onChange={(e) => setfName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lName}
                    onChange={(e) => setlName(e.target.value)}
                    
                  />
                </div>
              )}

              {/* Email input field */}
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                  required
                />
                <i className="fa-solid fa-user input-icon"></i> {/* Icon for email field */}
              </div>

              {/* Password input field */}
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between password visibility
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                  required
                />
                <i onClick={handleClick} className={`fa-solid ${showPassword ? "fa-lock-open" : "fa-lock"} input-icon`}></i> {/* Toggle password visibility icon */}
              </div>

              {/* Confirm password input (only shown in register mode) */}
              {isRegister && (
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                    required
                  />
                  <i onClick={handleClick} className={`fa-solid ${showPassword ? "fa-lock-open" : "fa-lock"} input-icon`}></i>
                </div>
              )}

              {/* Forgot password link (only shown in login mode) */}
              {!isRegister && (
                <a className="forgot-password-link mb-2" onClick={() => setShowForgotPopup(true)}>
                  Forgot Password?
                </a>
              )}

              {/* Submit button */}
              <button type="submit">{isRegister ? "Register" : "Login"}</button>
              {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}

              {/* Social login links */}
              <p>or {isRegister ? "register" : "login"} with social platforms</p>
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

      {/* ----------- Registration success popup ----------- */}
      {showPopup && (
        <div className="popup right">
          <div className="popup-content">
            <button
              onClick={() => setShowPopup(false)} // Close pop-up when clicked
              style={{ float: "right", cursor: "pointer", background: "none", border: "none" }}
            >
              ✖
            </button>
            <p>✅ Registration Successful!</p>
            <div className="input-wrapper">
              Email: <input type="email" value={email} readOnly />
            </div>
            <div className="input-wrapper">
              Password: <input type="text" value={password} readOnly />
            </div>
            <button onClick={handleLoginNow}>Login Now</button> {/* Redirect to login */}
          </div>
        </div>
      )}

      {/* ----------- Forgot password popup ----------- */}
      {showForgotPopup && (
        <div className="popup right">
          <div className="popup-content">
            <a className="close-icon" onClick={() => setShowForgotPopup(false)}>
              <i className="fa-solid fa-xmark"></i>
            </a>
            <h3>Reset Password</h3>
            <form onSubmit={handleResetPassword}>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)} // Update reset email state
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="New Password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)} // Update reset password state
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={resetConfirmPassword}
                  onChange={(e) => setResetConfirmPassword(e.target.value)} // Update reset confirm password state
                />
              </div>
              <button type="submit">Reset Password</button> {/* Submit password reset */}
              {resetMessage && <p>{resetMessage}</p>} {/* Show reset message */}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;