// app/page.tsx
'use client'
import Link from "next/link";
import { FiSend, FiFileText, FiInbox, FiZap, FiBarChart2, FiUsers, FiCheckCircle } from "react-icons/fi";
import DashboardCard from "./dashboard-card";
import TestimonialSection from "./testimonial-section";
import CTA from "./cta-section";
import FeatureSection from "./features-section";
import FooterSection from "./footer-section";
import Hero from "./hero-section";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <FiSend className="text-white text-lg" />
            </div>
            <span className="text-xl font-semibold text-gray-800">MailFlow</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero/>

      {/* Features Grid */}
      <FeatureSection/>
      

      {/* Dashboard Preview */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beautiful Dashboard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our intuitive interface makes email automation simple and effective
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-1 shadow-xl">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <DashboardCard
                  title="Send Email"
                  description="Send a new email using a template"
                  href="/send"
                  icon={<FiSend className="text-indigo-600 text-2xl" />}
                />
                <DashboardCard
                  title="Templates"
                  description="Manage your email templates"
                  href="/templates"
                  icon={<FiFileText className="text-indigo-600 text-2xl" />}
                />
                <DashboardCard
                  title="Sent Emails"
                  description="View your sent email history"
                  href="/sent"
                  icon={<FiInbox className="text-indigo-600 text-2xl" />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection/>

      {/* CTA Section */}
      <CTA/>

      {/* Footer */}
      <FooterSection/>
    </div>
  );
}


