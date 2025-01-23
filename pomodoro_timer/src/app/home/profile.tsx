"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";


const Profile: React.FC = () => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useSession(); 

  const handleClick = () => {
    router.push("/login");
  };

  // Wait for the session data to load before rendering
  if (!isLoaded) {
    return <div>Loading....</div>;
  }

  // If user is signed in, don't render the component at all
  if (isSignedIn) {
    return null;
  }

  // Render the sign-in button when user is not signed in
  return (
    <button
      onClick={handleClick}
      className="flex justify-end space-x-2 px-6 py-[0.5rem] rounded-lg bg-clockground text-background text-lg"
    >
      <CgProfile className="w-6 h-6" />
      <span>SIGN IN</span>
    </button>
  );
};

export default Profile;
