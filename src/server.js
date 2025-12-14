import express from "express";
import cors from "cors";
import { getMenuItems } from "./routes/menu_api.js"; // Thêm dòng này
import os from "os";

function getLocalIp() {
  const nets = os.networkInterfaces();
  let localIp = "localhost";
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        localIp = net.address;
        break;
      }
    }
  }
  return localIp;
}

const server = express();
const ipBe = getLocalIp();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    `http://${ipBe}:5173`,
    `http://${ipBe}:3001`,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));
server.use(express.json());

// Dùng menu_api thay vì menuRoutes
server.get("/api/menu", getMenuItems);

server.get("/", (req, res) => {
  res.json({ message: "Server is running on port 3001!" });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
  console.log(`✅ Local access: http://localhost:${PORT}`);
  console.log(`✅ Network access: http://${ipBe}:${PORT}`);
});
