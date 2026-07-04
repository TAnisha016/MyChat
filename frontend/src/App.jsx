import { useState } from "react";
import Login from "./Login.jsx";
import Chat from "./Chat.jsx";

export default function App() {
  const [username, setUsername] = useState(null);

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return <Chat username={username} onLogout={() => setUsername(null)} />;
}
