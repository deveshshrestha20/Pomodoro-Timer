"use client";

import { SignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-clockground mb-8">
              Welcome to Group Pomodoro Timer
            </h1>
            <p className="text-xl text-clockground mb-8">
            Create your own room and invite your friends for a group study
            </p>
            <button
              onClick={() => setShowSignIn(true)}
              className="px-6 py-3 bg-clockground text-background text-xl rounded-lg  transition-colors duration-200"
            >
              Log In to Get Started
            </button>
          </div>
        </div>
      </div>

      

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 z-10 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              
            </button>
            <SignIn
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "bg-white rounded-3xl shadow-lg w-full max-w-md ",
                  card: "shadow-none",
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
