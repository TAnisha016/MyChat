import { useState } from "react";
import { login } from "./api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      const user = await login(username);
      onLogin(user.username);
    } catch (err) {
      setError("Could not log in. Is the backend running?");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>MyChat</h1>
        <p>Enter a username to join</p>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <button type="submit">Join Chat</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
