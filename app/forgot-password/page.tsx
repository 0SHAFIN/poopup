"use client";

import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success("Password reset email sent! Check your inbox.");  // Success message
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  // Trigger toast notification when error changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        
      });
    }
  }, [error]);

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
        <div className="text-sm text-gray-400 mt-4 flex justify-center">
          <p className="mr-3">Back to Login</p>
          <a href="/login" className="text-[var(--button-bg)] hover:underline">
            Login
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordPage;
