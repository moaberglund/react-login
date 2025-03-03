import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


const SignupPage = () => {

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register({ username, password });
      navigate('/login');
    } catch (err) {
      setError("Failed to register. Control username and password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>

      <h1 className="signup">Create Account</h1>

      <div className="auth-form">

        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}

          <input
            aria-label="username"
            type="username"
            id="username"
            name="username"
            required value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            disabled={isLoading} />

          <input
            aria-label="password"
            type="password"
            id="password"
            name="password"
            required value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading} />

          <button
            className="btn signin-btn"
            type="submit"
            disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>

        </form>
      </div>

    </div>
  )
}

export default SignupPage