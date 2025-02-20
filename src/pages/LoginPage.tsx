import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const { login } = useAuth();
  const navigate = useNavigate();


  // Functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');


    try {

      await login({ username, password });
      navigate('/');

    } catch (err) {
      setError("Failed to login. Control username and password");
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
            <input type="username" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn submit-btn" type="submit">Login</button>

        </form>
      </div>
    </div>
  )
}

export default LoginPage

