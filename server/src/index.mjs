import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
// import authRoutes from "./routes/auth";
// import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // only accept requests from defined URL, and cookie must be included in request
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// index
app.get("/", async (req, res) => {
  res.status(200).json("gut-feelings API");
});

// register endpoint with Express
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
