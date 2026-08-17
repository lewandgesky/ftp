import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Templates } from "@/components/home/Templates";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { ParallaxBackground } from "@/components/motion/ParallaxBackground";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative">
      <ParallaxBackground />
      <ScrollProgress />

      <Navbar />
      
      <div className="flex-1">
        <Hero />
        <HowItWorks />
        <Services />
        <WhyChooseUs />
        <Templates />
        <Testimonials />
        <FAQ />
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
