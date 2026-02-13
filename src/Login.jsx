import { useRef, useState } from "react";
import { useUser } from "./contexts/UserProvider"; // Adjust path if needed
import { Navigate } from "react-router-dom";

export default function Login() {
  const [status, setStatus] = useState({ loading: false, error: false });
  const emailRef = useRef();
  const passwordRef = useRef();
  const { user, login } = useUser();

  const handleLogin = async () => {
    setStatus({ loading: true, error: false });
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    const success = await login(email, password);
    if (!success) {
      setStatus({ loading: false, error: true });
    }
  };

  // If logged in, redirect to Profile
  if (user.isLoggedIn) return <Navigate to="/profile" replace />;

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className="mb-3">
        <label>Email:</label>
        <input type="email" ref={emailRef} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password:</label>
        <input type="password" ref={passwordRef} className="form-control" />
      </div>
      <button onClick={handleLogin} disabled={status.loading} className="btn btn-primary">
        {status.loading ? "Logging in..." : "Login"}
      </button>
      {status.error && <p className="text-danger mt-2">Login failed.</p>}
    </div>
  );
}