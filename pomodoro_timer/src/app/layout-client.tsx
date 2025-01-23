"use client";

import React, { useEffect, useState } from 'react';
import localFont from "next/font/local";
import "./globals.css";
import TimeProvider from "./context/breakTimeProvider";
import TaskProvider from "./context/taskProvider";
import { Toaster } from "react-hot-toast";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { SignedInWrapper } from "./home/signInWrapper";
import { neobrutalism } from '@clerk/themes'
import RoomProvider from "./context/roomProvider";
import Loader from "./home/Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="h-screen flex flex-col relative">
            {isLoading ? (
              <div className="flex items-center justify-center h-screen text-clockground text-2xl"
                role="status"
                aria-live="polite">
                <Loader />
              </div>
            ) : (
              <div>
              <ClerkLoading>
                <div className="flex items-center justify-center h-screen text-clockground text-2xl"
                  role="status"
                  aria-live="polite">
                  <Loader />
                </div>
              </ClerkLoading>
              <ClerkLoaded>
                <SignedInWrapper />
                <TimeProvider>
                  <TaskProvider>
                    <RoomProvider>
                      {children}
                      <Toaster
                        position="top-right"
                        toastOptions={{
                          duration: 4000,
                          style: {
                            background: "#3c313b",
                            color: "#fff",
                            padding: "16px",
                            borderRadius: "10px",
                            fontFamily: "var(--font-geist-sans)",
                          },
                          success: {
                            iconTheme: {
                              primary: '#D8D2C2',
                              secondary: 'black',
                            },
                            style: {
                              background: "#3c313b",
                            },
                          },
                          error: {
                            style: {
                              background: "#f44336",
                            },
                          },
                        }}
                      />
                    </RoomProvider>
                  </TaskProvider>
                </TimeProvider>
              </ClerkLoaded>
              </div>
            )}
          </div>
        </body>
      </html>
    </ClerkProvider>
    
  );
}