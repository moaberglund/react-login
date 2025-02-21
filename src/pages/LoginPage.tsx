import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const { login } = useAuth();
  const navigate = useNavigate();


  // Functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);


    try {
      await login({ username, password });
      navigate('/');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to login. Control username and password");
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="login-layout">
      <h1 className="login">Welcome Back</h1>

      <div className="auth-form">

        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}


          <input
            aria-label="username"
            type="text"
            id="username"
            name="username"
            required
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading} />

          <input
            aria-label="password"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} />

          <button
            className="btn login-btn"
            type="submit"
            disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default LoginPage

