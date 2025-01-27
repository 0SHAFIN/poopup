"use client";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import AuthForm from "../components/AuthForm";

const SignupPage: React.FC = () => {
  const router = useRouter();

  const handleSignup = async ({ email, password }: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <AuthForm onSubmit={handleSignup} buttonText="Sign Up" />
    </div>
  );
};

export default SignupPage;
