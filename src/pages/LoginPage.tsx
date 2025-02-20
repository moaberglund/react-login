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
    <div>
      <h1>Login</h1>
      <div className="auth-form">

        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}

          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} />
          </div>

          <button
            className="btn submit-btn"
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

