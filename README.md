# MyChat App

MyChat is a simple one-to-one chat application built with a React frontend and a Node.js/Express backend.

Users can log in with a username, view a list of available users, select a user, and exchange direct messages. The frontend polls the backend every 2 seconds to fetch new messages.

## Features

- Dummy username-based login
- User list with selectable conversations
- One-to-one messaging between users
- Send and receive messages
- Message timestamps
- Automatic polling every 2 seconds for new messages
- Auto-scroll to the latest message
- Responsive dark-themed interface
- REST API communication between frontend and backend

## Tech Stack

### Frontend

- React
- Vite
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- CORS

### Storage

- In-memory storage for users and messages

## Project Structure

```text
MyChat/
├── backend/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── Login.jsx
        ├── Chat.jsx
        ├── api.js
        └── index.css
```

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/TAnisha016/MyChat.git
cd MyChat
```

### 2. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:3001
```

### 3. Start the Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

## How to Test Messaging

1. Open the application in a normal browser window.
2. Log in with a username, for example `Tanisha`.
3. Open the application in an Incognito/Private browser window.
4. Log in with another username, for example `Alex`.
5. Each logged-in user will appear in the other user's user list.
6. Select the user you want to chat with.
7. Send messages between the two sessions.
8. New messages appear within approximately 2 seconds.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Log in with a username and register the user in memory |
| GET | `/api/users?currentUsername=<username>` | Get all users except the currently logged-in user |
| GET | `/api/messages?user1=<user1>&user2=<user2>` | Get the conversation between two users |
| POST | `/api/messages` | Send a direct message to another user |

## API Examples

### Login Request

```json
{
  "username": "Tanisha"
}
```

### Send Message Request

```json
{
  "sender": "Tanisha",
  "receiver": "Alex",
  "text": "Hello!"
}
```

### Message Object

```json
{
  "id": 1,
  "sender": "Tanisha",
  "receiver": "Alex",
  "text": "Hello!",
  "timestamp": "2026-07-04T10:30:00.000Z"
}
```

## Implementation Notes

- Users and messages are stored in memory on the backend.
- Data resets whenever the backend server restarts.
- Authentication is intentionally simplified to username-only login for demonstration purposes.
- Message updates are implemented using polling every 2 seconds.
- REST APIs are used for communication between the React frontend and Node.js backend.

## Limitations

- No persistent database
- No password-based authentication
- No WebSocket or Socket.IO connection
- Data is lost when the backend restarts

## Future Improvements

- Add Socket.IO for real-time messaging
- Add MongoDB or PostgreSQL for persistent storage
- Add secure authentication
- Add unread message indicators
- Add online/offline user status