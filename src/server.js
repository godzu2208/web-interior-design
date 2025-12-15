import express from "express";
import cors from "cors";
import { getMenuItems } from "./routes/menu_api.js";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

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
const PORT = process.env.PORT || 3001;

// ============================================
// CORS CONFIGURATION - PRODUCTION & LOCAL
// ============================================

const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  `http://${ipBe}:5173`,
  `http://${ipBe}:3001`,
  // Production (from env variable)
  process.env.FRONTEND_URL,
  // Vercel preview deployments
  "https://web-interior-design-rose.vercel.app",
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, // 24 hours
};

server.use(cors(corsOptions));
server.use(express.json());

// ============================================
// HEALTH CHECK - REQUIRED FOR CLOUD RUN
// ============================================

server.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============================================
// API ROUTES
// ============================================

server.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is working!",
    environment: process.env.NODE_ENV,
  });
});

server.get("/api/menu", getMenuItems);

server.get("/", (req, res) => {
  res.json({ message: "Server is running on port 3001!" });
});

// ============================================
// ERROR HANDLING
// ============================================

server.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ============================================
// START SERVER
// ============================================

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
  console.log(`✅ Local access: http://localhost:${PORT}`);
  console.log(`✅ Network access: http://${ipBe}:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
  console.log(`✅ CORS origins:`, allowedOrigins);
  console.log(`✅ Node environment: ${process.env.NODE_ENV || "development"}`);
});
