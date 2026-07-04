

const BASE_URL = "http://localhost:3001/api";

export async function login(username) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function getUsers(currentUsername) {
  const res = await fetch(
    `${BASE_URL}/users?currentUsername=${encodeURIComponent(
      currentUsername
    )}`
  );

  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  return res.json();
}

export async function getMessages(user1, user2) {
  const res = await fetch(
    `${BASE_URL}/messages?user1=${encodeURIComponent(
      user1
    )}&user2=${encodeURIComponent(user2)}`
  );

  if (!res.ok) {
    throw new Error("Failed to load messages");
  }

  return res.json();
}

export async function sendMessage(
  sender,
  receiver,
  text
) {
  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender,
      receiver,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}