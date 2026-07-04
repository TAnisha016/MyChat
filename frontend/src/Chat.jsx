

import { useEffect, useRef, useState } from "react";
import {
  getUsers,
  getMessages,
  sendMessage,
} from "./api";

const POLL_INTERVAL_MS = 2000;

function formatTime(isoString) {
  const date = new Date(isoString);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Chat({
  username,
  onLogout,
}) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] =
    useState(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  // Loads users and keep refreshing the list
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const data = await getUsers(username);

        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();

    const interval = setInterval(
      fetchUsers,
      POLL_INTERVAL_MS
    );

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [username]);

  // Loads messages for selected conversation
  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    let isMounted = true;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(
          username,
          selectedUser.username
        );

        if (isMounted) {
          setMessages(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    const interval = setInterval(
      fetchMessages,
      POLL_INTERVAL_MS
    );

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [username, selectedUser]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!text.trim() || !selectedUser) {
      return;
    }

    try {
      const newMessage = await sendMessage(
        username,
        selectedUser.username,
        text
      );

      setMessages((prev) => [
        ...prev,
        newMessage,
      ]);

      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="user-sidebar">
        <div className="sidebar-header">
          <div>
            <strong>Chats</strong>
            <span className="logged-in-user">
              Logged in as {username}
            </span>
          </div>

          <button onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className="user-list">
          {users.map((user) => (
            <button
              key={user.username}
              className={`user-item ${
                selectedUser?.username ===
                user.username
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setSelectedUser(user);
                setMessages([]);
              }}
            >
              <div className="user-avatar">
                {user.username
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="user-info">
                <strong>{user.username}</strong>
                <span>Click to start chatting</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <main className="chat-container">
        {selectedUser ? (
          <>
            <header className="chat-header">
              <div>
                <span>Chat with </span>
                <strong>
                  {selectedUser.username}
                </strong>
              </div>
            </header>

            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="empty-conversation">
                  No messages yet. Say hello to{" "}
                  {selectedUser.username}!
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message ${
                    msg.sender === username
                      ? "own"
                      : "other"
                  }`}
                >
                  <div className="chat-message-meta">
                    <strong>
                      {msg.sender}
                    </strong>

                    <span>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>

                  <div className="chat-message-text">
                    {msg.text}
                  </div>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            <form
              className="chat-input"
              onSubmit={handleSend}
            >
              <input
                type="text"
                placeholder={`Message ${selectedUser.username}...`}
                value={text}
                onChange={(e) =>
                  setText(e.target.value)
                }
              />

              <button type="submit">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h2>Welcome, {username}</h2>
            <p>
              Choose someone from the user list
              to start chatting.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
