import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "./providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MailFlow | Email Sender",
  description: "Create, send, and schedule emails with customizable templates",
  icons: {
    icon: "./favicon.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div>
            {children}
          </div>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
