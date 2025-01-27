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
      <div className="w-96 bg-gray-800 p-6 rounded-md">
        <h1 className="text-center text-2xl font-bold mb-4">Forgot Password</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 rounded bg-gray-700 mb-4"
        />
        <button
          onClick={handlePasswordReset}
          className="w-full bg-orange-500 p-2 rounded text-white"
        >
          Reset Email
        </button>
        <p className="text-sm text-gray-400 mt-4">
          Back to Login{" "}
          <a href="/login" className="text-orange-400 hover:underline">
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
