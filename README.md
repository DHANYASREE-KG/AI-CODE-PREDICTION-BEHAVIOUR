**AI Code Behaviour Predictor**

A lightweight full-stack tool for analyzing and predicting the behavior of AI-generated code.
It includes a browser-based interface for entering code and a Node.js backend that processes the input and returns prediction data.

**✨ Features**

Interactive UI for submitting code snippets

Node.js/Express backend for prediction handling

Modular structure for plugging in custom logic

System execution-flow diagram included

Zero build tooling required

**📁 Project Structure**
AI Code Behaviour Predictor/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── static/
│       └── execution_flow.png
│
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css
**
🛠 Requirements**

Node.js v16+

npm or yarn

Any modern web browser

**🚀 Installation & Setup**
**1. Install Backend Dependencies**
cd backend
npm install

**2. Start the Server**
node server.js


Server runs at:

http://localhost:3000

**3. Open the Frontend**

Open:

frontend/index.html

**🔍 How It Works**
**Frontend**

Sends user-entered code to the backend

Displays returned predictions

Uses plain JavaScript for simplicity

**Backend**

Express-based API

Receives input, executes prediction logic, returns JSON

Contains an execution-flow diagram for reference

Execution Flow Diagram

**Located at:**

backend/static/execution_flow.png

**🧩 Customization**
Prediction Logic

**Edit:**

backend/server.js


**Plug in:**

ML models

External API calls

Rule-based engines

Custom analyzers

**Frontend**
**
Upgrade using frameworks/libraries if needed:
**
React, Vue, Svelte

Monaco editor

Tailwind or Bootstrap

API Extensions

**Add new endpoints for:**

Batch predictions

File analysis

Logs or analytics

Mode switching

**📌 Notes**

Remove node_modules before pushing to a repo (.gitignore recommended).

Project is deliberately minimal for easy modification.

No bundlers or build steps required.
