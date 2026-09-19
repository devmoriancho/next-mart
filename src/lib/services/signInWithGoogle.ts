import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export const signInWithGoogle = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
    });
  } catch (error) {
    console.error("Google sign-in failed:", error);
    toast.error("Google sign-in failed");
  }
};
