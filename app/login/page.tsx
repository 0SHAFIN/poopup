"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    }
  };

  return (
<div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
  <div className="w-96 bg-gray-800 p-6 rounded-3xl shadow-2xl">
    <h1 className="text-center text-2xl font-bold mb-6">Login</h1>
    <form onSubmit={handleLogin} className="flex flex-col">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-700 mb-6"
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-700 mb-6"
        required
      />
      <button
        type="submit"
        className="w-full bg-[var(--button-bg)] hover:bg-[#FFA629] p-2 rounded-lg text-[var(--button-text)] font-bold"
      >
        Login
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </form>
    <p className="text-sm text-gray-400 mt-4 flex justify-between">
      <span>
        No account?{" "}
        <a href="/signup" className="text-[var(--button-bg)] hover:underline">
          Sign up
        </a>
      </span>
      <a href="/forgot-password" className="text-[var(--button-bg)] hover:underline">
        Forgot password?
      </a>
    </p>
  </div>
</div>

  );
};

export default LoginPage;
