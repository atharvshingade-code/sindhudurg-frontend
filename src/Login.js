import { useState } from "react";
import { supabase } from "./supabase";
import "./Login.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Sindhudurg District</h1>
        <h2>Education Department</h2>
        <p className="subtitle">Monthly Staff Vacancy System</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <footer>
          Government of Maharashtra<br />
          Zilla Parishad, Sindhudurg
        </footer>
      </div>
    </div>
  );
}
