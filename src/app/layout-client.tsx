"use client";

import localFont from "next/font/local";
import "./globals.css";
import TimeProvider from "./context/breakTimeProvider";
import TaskProvider from "./context/taskProvider";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { SignedInWrapper } from "./home/signInWrapper";

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
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="h-screen flex flex-col relative">
          <SignedInWrapper />
            <TimeProvider>
              <TaskProvider>
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                      padding: "16px",
                      borderRadius: "10px",
                      fontFamily: "var(--font-geist-sans)",
                    },
                    success: {
                      style: {
                        background: "#4CAF50",
                      },
                    },
                    error: {
                      style: {
                        background: "#f44336",
                      },
                    },
                  }}
                />
              </TaskProvider>
            </TimeProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
