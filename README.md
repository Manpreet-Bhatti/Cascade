# 🌊 Cascade: Distributed Log Visualizer

A real-time log aggregation and visualization dashboard. It simulates a distributed system where multiple microservices stream logs to a central "ingestor" service, which then pipes data to a React dashboard via WebSockets for live traffic monitoring.

## 🚀 Features

- **High-Performance Ingestion:** Uses Node.js `stream.Transform` to handle massive log streams without memory crashes.
- **Real-Time Updates:** Socket.io pushes events to the client instantly.
- **Visual Dashboard:** React + Recharts for visualizing traffic volume (Logs/Sec).
- **Live Log Feed:** Scrollable, buffered log table with semantic highlighting.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, Socket.io, Mongoose (MongoDB), TypeScript
- **Frontend:** React (Vite), TailwindCSS, Recharts, Lucide React
- **Generator:** Node.js script (simulates microservice traffic)

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

1. Node.js (v18+ recommended)
2. MongoDB (Must be running locally on port `27017`)

## ⚙️ Installation

Clone the repository and install dependencies for each service:

1. Setup Backend

```bash
cd backend
npm install
```

*Note: Ensure your `tsconfig.json` is configured correctly.*

2. Setup Frontend

```bash
cd ../frontend
npm install
```

3. Setup Generator

```bash
cd ../generator
npm install
```

## 🏃‍♂️ How to Run

You will need **three terminal windows** open to run the full stack.

**Terminal 1: Database & Backend**
First, make sure MongoDB is running.

- **Mac:** `brew services start mongodb-community`
- **Windows:** Start "MongoDB Server" in Services.
- **Linux:** `sudo systemc start mongod`

Then, start the ingestor server:

```bash
npx ts-node src/server.ts
```

Expect output: `Cascade Ingestor running on :3001` & `MongoDB Connected to Cascade`

**Terminal 2: Frontend Dashboard**
Start the React development server:

```bash
cd frontend
npm run dev
```

Open your browser to the URL shown (usually `http://localhost:5173`). You should see the empty dashboard.

**Terminal 3: Traffic Generator**
Start the dummy log generator to simulate traffic:

```bash
cd generator
npx ts-node dummy.ts
```

Expected output: Continuous logs like `Sent: [info] auth-service`
