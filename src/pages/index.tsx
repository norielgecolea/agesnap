
import React, { useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import AgeCalculator from "@/components/AgeCalculator";
import LegacyCalculator from "@/components/LegacyCalculator";
import CountdownCalculator from "@/components/CountdownCalculator";
import UniversalCalculator from "@/components/UniversalCalculator";

export default function Home() {
  const [activeTab, setActiveTab] = useState("exact-age");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "exact-age":
        return <AgeCalculator />;
      case "legacy":
        return <LegacyCalculator />;
      case "countdown":
        return <CountdownCalculator />;
      case "universal":
        return <UniversalCalculator />;
      default:
        return <AgeCalculator />;
    }
  };

  return (
    <>
      <Head>
        <title>AgeSnap - Age Calculator</title>
        <meta name="description" content="Calculate your exact age, countdown to events, and convert time units with AgeSnap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Age Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate your exact age, count down to special events, and convert between different time units with precision and ease.
            </p>
          </div>

          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex justify-center">
            {renderActiveComponent()}
          </div>

          <footer className="mt-16 text-center text-gray-500 text-sm">
            <p>&copy; 2025 AgeSnap. Calculate time with precision.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
