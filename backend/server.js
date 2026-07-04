
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory (databse)

// Dummy users are visible immediately the ones addded below
// New usernames are added when someone logs in the app
let users = [
  { username: "Alex" },
  { username: "Sam" },
  { username: "Jordan" },
  { username: "Maya" },
];

// Direct messages:
// { id, sender, receiver, text, timestamp }
let messages = [];

let nextMessageId = 1;

//  Routes 

// Login and create user
app.post("/api/login", (req, res) => {
  const { username } = req.body;

  if (!username || !username.trim()) {
    return res.status(400).json({
      error: "Username is required",
    });
  }

  const cleanUsername = username.trim();

  const existingUser = users.find(
    (user) =>
      user.username.toLowerCase() === cleanUsername.toLowerCase()
  );

  if (!existingUser) {
    users.push({ username: cleanUsername });
  }

  res.json({
    username: existingUser
      ? existingUser.username
      : cleanUsername,
  });
});

// Gets all users except current logged-in user, basically what we as logged user see
app.get("/api/users", (req, res) => {
  const currentUsername = req.query.currentUsername;

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase() !==
      currentUsername?.toLowerCase()
  );

  res.json(filteredUsers);
});

// Gets conversation between two users
app.get("/api/messages", (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({
      error: "user1 and user2 are required",
    });
  }

  const conversation = messages.filter((message) => {
    return (
      (message.sender === user1 &&
        message.receiver === user2) ||
      (message.sender === user2 &&
        message.receiver === user1)
    );
  });

  res.json(conversation);
});

// Sends direct message
app.post("/api/messages", (req, res) => {
  const { sender, receiver, text } = req.body;

  if (
    !sender ||
    !receiver ||
    !text ||
    !text.trim()
  ) {
    return res.status(400).json({
      error: "sender, receiver and text are required",
    });
  }

  const newMessage = {
    id: nextMessageId++,
    sender,
    receiver,
    text: text.trim(),
    timestamp: new Date().toISOString(),
  };

  messages.push(newMessage);

  res.status(201).json(newMessage);
});

app.listen(PORT, () => {
  console.log(
    `Chat backend running at http://localhost:${PORT}`
  );
});
