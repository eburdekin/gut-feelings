// src/routes/auth.js

import express from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [check("email", "Email is required").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email } = req.body;

    // Use instance of Supabase initialized in index.js
    const supabase = req.app.locals.supabase;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          redirectTo: process.env.FRONTEND_URL,
        },
      });

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      // Respond with a message that an email has been sent
      res.status(200).json({ message: "Check your email for the login link!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
