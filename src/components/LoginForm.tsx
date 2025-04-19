import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const { token } = data;
      login(token); // Save token in context

      navigate("/tasks");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded-xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded-xl"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700"
      >
        Login
      </button>
      {error && <p className="text-red-600 text-center">{error}</p>}
    </form>
  );
};

export default Login;
