import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import boardsRoute from "./routes/boards.js";
import tasksRoute from "./routes/tasks.js";
import listRoutes from "./routes/lists.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/boards", boardsRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/lists", listRoutes);

// Webhook from Trello
app.head("/webhook", (req, res) => res.sendStatus(200));

app.post("/webhook", (req, res) => {
  io.emit("trello-event", req.body);   // broadcast to all clients
  res.sendStatus(200);
});

// Start server + WebSocket
const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log("Backend running on port", PORT));
