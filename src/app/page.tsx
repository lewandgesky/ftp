import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Services } from "@/components/home/Services";
import { Templates } from "@/components/home/Templates";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/sea-storm.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to blend the video with the warm palette */}
        <div className="absolute inset-0 bg-[#ebe5de]/30 mix-blend-overlay"></div>
      </div>

      <Navbar />
      
      <div className="flex-1">
        <Hero />
        <HowItWorks />
        <Services />
        <Templates />
        <Testimonials />
        <FAQ />
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
