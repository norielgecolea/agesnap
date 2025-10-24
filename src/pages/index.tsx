"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import AgeCalculator from "@/components/AgeCalculator";
import AgeGapCalculator from "@/components/AgeGapCalculator";
import NextBirthdayCalculator from "@/components/NextBirthdayCalculator";
import BirthYearCalculator from "@/components/BirthYearCalculator";

// ✅ Fix TypeScript error
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("exact-age");

  useEffect(() => {
    try {
      if (window.adsbygoogle && process.env.NODE_ENV === "production") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "exact-age":
        return <AgeCalculator />;
      case "age-gap":
        return <AgeGapCalculator />;
      case "next-birthday":
        return <NextBirthdayCalculator />;
      case "birth-year":
        return <BirthYearCalculator />;
      default:
        return <AgeCalculator />;
    }
  };

  return (
    <>
      <Head>
        <title>AgeSnap - Age Calculator</title>
        <meta
          name="description"
          content="Calculate your exact age, find age gaps, countdown to birthdays, and determine birth years with AgeSnap"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* ✅ AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3738297787059683"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Age Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A versatile tool to explore everything about age. Calculate exact
              age, find the gap between two dates, countdown to your next
              birthday, or find a birth year.
            </p>
          </div>

          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex justify-center">{renderActiveComponent()}</div>

          {/* ✅ AdSense block */}
          <div className="my-10 flex justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-format="fluid"
              data-ad-layout-key="-fb+5w+4e-db+86"
              data-ad-client="ca-pub-3738297787059683"
              data-ad-slot="9651419496"
            ></ins>
          </div>

          <footer className="mt-16 text-center text-gray-500 text-sm">
            <p>&copy; 2025 NorielGecolea.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
