"use client";
import { ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const SignedInWrapper = () => {
  const [isClient, setIsClient] = useState(false);
  
  

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
    <ClerkLoading>
    <div className="flex items-center justify-center text-clockground text-2xl">
              LOADING............
            </div>
    </ClerkLoading>
    <SignedIn >
      <div className="absolute  bottom-12 right-6  z-30">
        <UserButton  appearance={{
          variables: {
            
            fontSize: "1.1rem",
          },
          elements:{
            
            userButtonAvatarBox:{
              width: '45px',
              height: '45px',
            },
            
          }
        }}  />
        
        
      </div>
    </SignedIn>
    </div>
  );
};
