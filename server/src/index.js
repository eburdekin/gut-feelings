// src/index.js

import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";

// Using ES module syntax, imports reference .js files explicitly
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Make supabase available to routes
app.locals.supabase = supabase;

// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     // Only accept requests from defined URL, and cookie must be included in request
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// Index
app.get("/", async (res) => {
  res.send("gut-feelings API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
