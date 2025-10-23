# Bino-Discovery-Quiz
Bino Discovery Quiz is a fun and interactive web app that helps people learn about Bino — a WhatsApp-based search platform. It engages users with quick quizzes, creative design, and smooth interactions. Built using React, it’s designed to spread awareness about Bino in a simple, playful, and modern way.


bino-quickshare/
├── README.md
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── App.jsx
│       └── styles.css
└── backend/
    ├── package.json
    ├── index.js
    └── models/
        └── Share.js


  And For excution follow below steps


## Local run (requires Node and MongoDB)
1. backend:
   cd backend
   npm install
   export MONGO_URL="mongodb://localhost:27017/bino_quickshare"
   npm start

2. frontend:
   cd frontend
   npm install
   export REACT_APP_BACKEND=http://localhost:4000
   npm start

Open http://localhost:3000
