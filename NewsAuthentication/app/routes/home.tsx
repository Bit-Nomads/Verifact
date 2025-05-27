import type { Route } from "./+types/home";
import '../app.css';
import React from "react";
import PromptPage from "./dashboard/prompt";

import Header from "../components/header";
import HeroSection from "../components/hero";
import Features from "../components/features";
import HowItWorksSection from "../components/howItWorks";
import Footer from "../components/footer";
// import { Style } from "util";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verifact - AI-Powered News Verification Platform" },
    { name: "description", content: "Welcome to Verifact!" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden font-['Inter','Noto_Sans',sans-serif]">
        <Header />
        <HeroSection />
        <Features />
        <HowItWorksSection />
        <Footer />
      </div>
    </>
  );
}


