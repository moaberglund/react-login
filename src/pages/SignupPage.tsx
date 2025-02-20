import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


const SignupPage = () => {

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  // Functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await register({ username, password });
      navigate('/login');
    } catch (err) {
      setError("Failed to register. Control username and password");
    }
  }

  return (
    <div>

      <h1>Sign up</h1>

      <div className="auth-form">

        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}

          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="username" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn submit-btn" type="submit">Sign up</button>

        </form>
      </div>

    </div>
  )
}

export default SignupPage