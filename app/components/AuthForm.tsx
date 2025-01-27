"use client";

import React, { useState } from "react";

interface AuthFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-gray-800 p-6 rounded shadow-md"
    >
      <input
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 w-full rounded border"
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6 p-2 w-full rounded border"
        required
      />
      <button
        type="submit"
        className="bg-yellow-500 px-4 py-2 rounded text-black w-full"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
