"use client";
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import { useSession } from '@clerk/nextjs';

const Profile: React.FC = () => {
  const router = useRouter();
  const { isSignedIn } = useSession();

  const handleClick = () => {
    router.push('/login');
  };

  // If user is signed in, don't render the component at all
  if (isSignedIn) {
    return null;
  }

  // Only render the sign-in button when user is not signed in
  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-black"
    >
      <CgProfile className="w-6 h-6" />
      <span>SIGN IN</span>
    </button>
  );
};

export default Profile;