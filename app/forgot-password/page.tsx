"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-96 bg-gray-800 p-6 rounded-3xl shadow-2xl">
        <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 rounded-lg bg-gray-700 mb-6"
        />
        <button
          onClick={handlePasswordReset}
          className="w-full bg-[var(--button-bg)] hover:bg-[#FFA629] p-2 rounded-lg text-[var(--button-text)] font-bold"
        >
          Reset Email
        </button>
        <p className="text-sm text-gray-400 mt-4">
          Back to Login{" "}
          <a href="/login" className="text-[var(--button-bg)] hover:underline">
            Log in
          </a>
        </p>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
