"use client";

import { SignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Pomodoro Timer
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Boost your productivity with our focused timer application
            </p>
            <button
              onClick={() => setShowSignIn(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Log In to Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Normal Homepage Content - visible when not logged in */}
      {!showSignIn && (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">
            Enjoy the features of the Pomodoro Timer even without logging in!
          </p>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 z-10 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ×
            </button>
            <SignIn
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "bg-white rounded-lg shadow-lg w-full max-w-md p-6",
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
