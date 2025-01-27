"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign up.");
    }
  };

  return (
<div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
  <div className="w-96 bg-gray-800 p-6 rounded-md">
    <h1 className="text-center text-2xl font-bold mb-4">Sign Up</h1>
    <form onSubmit={handleSignup} className="flex flex-col">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white mb-4"
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white mb-4"
        required
      />
      <button
        type="submit"
        className="w-full bg-orange-500 p-2 rounded text-white"
      >
        Sign Up
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </form>
    <p className="text-sm text-gray-400 mt-4">
      Have an account?{" "}
      <a href="/login" className="text-orange-400 hover:underline">
        Log in
      </a>
    </p>
  </div>
</div>

  );
};

export default SignupPage;
