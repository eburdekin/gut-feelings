// src/routes/users.js

import express from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { username, email, password } = req.body;

    const supabase = req.app.locals.supabase;

    try {
      const { data: user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError || !user) {
        const errorMessage = signUpError
          ? signUpError.message
          : "User signup failed";
        return res.status(400).json({ message: errorMessage });
      }

      const { data: insertedUser, error: insertError } = await supabase
        .from("users")
        .insert([{ username, email }]);

      if (insertError) {
        return res.status(500).json({ message: insertError.message });
      }

      res.status(201).send({ message: "User registered!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
