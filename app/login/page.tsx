"use client";

import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import AuthForm from "../components/AuthForm";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <AuthForm onSubmit={handleLogin} buttonText="Sign In" />
    </div>
  );
};

export default LoginPage;
