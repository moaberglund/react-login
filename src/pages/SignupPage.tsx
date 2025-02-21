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
    <div className="login-layout">

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
          placeholder="Username" />

          <input 
          aria-label="password"
          type="password" 
          id="password" 
          name="password" 
          required value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" />


          <button className="btn signin-btn" type="submit">Sign up</button>

        </form>
      </div>

    </div>
  )
}

export default SignupPage