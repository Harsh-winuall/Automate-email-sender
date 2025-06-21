import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { QueryProvider } from "../providers/QueryProvider";
import LandingPage from "../_components/landing-page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MailFlow | Email Sender Dashboard",
  description: "Create, send, and schedule emails with customizable templates",
  icons: {
    icon: "../../../public/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    
          <div>
            <div className="flex h-screen w-full overflow-hidden bg-background">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                  {children}
                </main>
              </div>
            </div>
          </div>
        
  );
}
