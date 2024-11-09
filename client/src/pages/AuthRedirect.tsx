import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Use `location.hash` if the tokens are in the hash fragment
        const queryParams = new URLSearchParams(location.hash.slice(1));
        const accessToken = queryParams.get("access_token");
        const refreshToken = queryParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error("Error setting session:", error.message);
            navigate("/login");
          } else {
            navigate("/dashboard");
          }
        } else {
          console.error("Tokens are missing from the URL.");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error during email confirmation:", err);
        navigate("/login");
      }
    };

    confirmEmail();
  }, [location, navigate]);

  return <p>Verifying your email...</p>;
};

export default AuthRedirect;
