"use client";

import { useState, useEffect } from 'react';
import { LogOut, CreditCard } from 'lucide-react';
import { auth } from "../../lib/firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the home page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-[--usecase-card] flex flex-col">
      {/* Header with Increased Padding */}
      <header className="bg-[--first-slide-bg] py-4 px-96">
        <div className="flex justify-between items-center">
          
          {/* Account Button with Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleAccount}
              className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold transition-transform duration-300 hover:bg-[#FFA629] flex items-center gap-2"
            >
              {user ? (
              <span>{user.email} {" "} </span>
              ) : (
              <span>Account</span>
              )}
              <FontAwesomeIcon 
              icon={faAngleDown} 
              className={`transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : ''}`}
              style={{ fontSize: '1.2rem' }}
              />
            </button>
            
            {isAccountOpen && (
                      <div className="absolute bg-[--first-slide-bg] right-0 mt-2 w-40 rounded-3xl shadow-lg py-2 z-50">
                        <button className="w-full px-3 py-2 text-left hover:bg-[--card-light-bg] flex items-center gap-2 rounded-lg font-semibold text-sm">
                          <CreditCard className="w-4 h-4" />
                          <span>Billing</span>
                        </button>
                        <button 
                          onClick={handleLogout} 
                          className="w-full px-3 py-2 text-left hover:bg-[--card-light-bg] flex items-center gap-2 rounded-lg font-semibold text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
            )}
          </div>

          {/* Get Started Button */}
          <button className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629]">
            Get Started
          </button>
        </div>
      </header>
      <div className="">
        <div className="mr-auto ml-96 mt-16 text-[var(--first-slide-text)] font-extrabold text-xl">
          0 PoopUps
          {/* PoopUps */}
        </div>
        {/* Main Content */}
        <div className="w-80 bg-[var(--first-slide-bg)] ml-auto mr-96 rounded-3xl shadow-sm p-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-[var(--first-slide-text)] text-lg font-semibold">Fancy a new PoopUp?</h2>
              <p className="text-[var(--first-slide-text)] text-sm font-medium">
                Add your domain name to get started, no need to add "https://" or "www."
              </p>
            </div>
            <input
              type="text"
              placeholder="unicorn.com"
              className="w-full bg-[var(--first-slide-bg)] px-5 py-2 rounded-3xl border border-[#8a4938] focus:outline-none focus:ring-2 focus:ring-[var(--button-text)] focus:border-transparent"
            />
            <button className="w-full bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629]">
              Add Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
