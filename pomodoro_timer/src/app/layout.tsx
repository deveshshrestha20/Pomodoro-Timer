import "./globals.css";
import { Metadata } from 'next';
import RootLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'Pomodoro Timer',
  description: 'A simple Pomodoro timer application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
