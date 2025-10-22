import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menuRoutes.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
