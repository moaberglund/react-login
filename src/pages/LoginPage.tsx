import { useState } from "react";

const LoginPage = () => {

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Functions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  }


  return (
    <div>
      <h1>Login</h1>
      <div className="auth-form">

        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
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

