import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginUser, restoreToken } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken && !token) {
      dispatch(restoreToken(sessionToken));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!credential || !password)
      return setError("Mohon masukan username/email dan password!");

    try {
      await dispatch(loginUser({ credential, password })).unwrap();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">
          Welcome to Lifami Management
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Enter your credential to access your account
        </p>
        {error && (
          <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <InputField
            id="credential"
            name="credential"
            label="Enter Email or username"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
          <InputField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <div className="flex justify-center items-center space-x-2">
              <Checkbox id="rememberme" />
              <Label
                htmlFor="rememberme"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
            <a href="#" className="text-sm hover:underline">
              Forgot your password?
            </a>
          </div>
          <Button type="submit" className="w-full my-4">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
