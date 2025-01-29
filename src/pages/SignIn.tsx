// src/pages/SignIn.tsx
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

export type SignInFormData = {
  email: string;
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useAppContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await apiClient.signIn({ email });
      showToast({
        message: "Check your email for the login link!",
        type: "SUCCESS",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast({ message: error.message, type: "ERROR" });
      } else {
        showToast({ message: "An unexpected error occurred.", type: "ERROR" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Magic Link</button>
    </form>
  );
};

export default SignIn;
