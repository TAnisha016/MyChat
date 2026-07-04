# Simple Chat App

A minimal chat application with a React frontend and a Node.js/Express backend.
Messages are stored in memory on the server (no database), and the frontend polls
the server every 2 seconds for new messages.

## Project Structure

```
chat-app/
├── backend/
│   ├── server.js       # Express REST API (login, get/send messages)
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx     # React entry point
        ├── App.jsx      # Switches between Login and Chat
        ├── Login.jsx    # Dummy login screen (username only)
        ├── Chat.jsx     # Chat UI (message list + input, polling)
        ├── api.js       # Fetch calls to the backend
        └── index.css    # Styling
```

## How to Run

### 1. Start the backend
```bash
cd backend
npm install
npm start
```
Runs on `http://localhost:3001`.

### 2. Start the frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`. Open it in a browser (or resize to mobile width).

Open two browser tabs, log in with two different usernames, and chat between them —
messages appear in both within ~2 seconds.

## API Endpoints

| Method | Endpoint         | Body                        | Description                    |
|--------|------------------|------------------------------|--------------------------------|
| POST   | `/api/login`     | `{ username }`               | Dummy login, no password       |
| GET    | `/api/messages`  | —                             | Get all messages               |
| POST   | `/api/messages`  | `{ username, text }`         | Send a new message (timestamped)|

## Notes

- No real database — messages/users reset when the backend restarts. Simple to swap
  in MongoDB/Postgres later since all storage logic lives in `server.js`.
- No real authentication — login just records a username. Fine for a demo/take-home,
  not for production.
- Polling instead of WebSockets to keep the implementation and dependencies minimal.
