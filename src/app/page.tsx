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
    <main className="flex min-h-screen flex-col">
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
