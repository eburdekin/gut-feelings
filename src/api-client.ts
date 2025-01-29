// src/api-client.ts
import { supabase } from "./supabaseClient.ts";

export const register = async (formData: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: { username: formData.username },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signIn = async (formData: { email: string }) => {
  const { error } = await supabase.auth.signInWithOtp({
    email: formData.email,
  });

  if (error) {
    throw new Error(error.message);
  }
};
