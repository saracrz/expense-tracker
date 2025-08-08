import { useState } from "react";
import { LoginForm } from "../auth/LoginForm";
import { useAuth } from "../auth/useAuth";

export const LoginSection = () => {
  const { login, register, user, loading } = useAuth();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    try {
      if (isRegistering) {
        await register(emailValue, passwordValue);
      } else {
        await login(emailValue, passwordValue);
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Authentication failed");
    }
  };

  return (
    <>
      <LoginForm
        emailValue={emailValue}
        passwordValue={passwordValue}
        onChangeEmail={setEmailValue}
        onChangePassword={setPasswordValue}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading
          ? isRegistering
            ? "Registering..."
            : "Logging in..."
          : isRegistering
          ? "Register"
          : "Login"}
      </button>
      <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
      {error && <p className="error">{error}</p>}
      {user && <p>Welcome, {user.email}!</p>}
      {loading && <p>Loading...</p>}
    </>
  );
};
