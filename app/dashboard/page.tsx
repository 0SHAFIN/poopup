"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return user ? (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1>Welcome, {user.email}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  ) : null;
};

export default DashboardPage;
