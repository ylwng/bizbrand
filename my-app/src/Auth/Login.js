import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

      <div className="role-selection">
        <p>Login as:</p>
        <div className="role-buttons">
          <button type="button">Student</button>
          <button type="button">Mentor</button>
        </div>
      </div>

      <p className="signup-text">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}
