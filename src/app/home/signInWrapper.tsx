import { SignedIn, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const SignedInWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <SignedIn >
      <div className="absolute top-2 right-4 p-2 z-10">
        <UserButton showName />
      </div>
    </SignedIn>
  );
};
