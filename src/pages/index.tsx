"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import AgeCalculator from "@/components/AgeCalculator";
import AgeGapCalculator from "@/components/AgeGapCalculator";
import NextBirthdayCalculator from "@/components/NextBirthdayCalculator";
import BirthYearCalculator from "@/components/BirthYearCalculator";

// ✅ Tell TypeScript about adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("exact-age");
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (adRef.current && adRef.current.offsetWidth >= 250) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 1000); // ⏱ wait a bit for layout

    return () => clearTimeout(timeout);
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
        <link rel="icon" href="/agesnap.ico" />

        {/* ✅ AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3738297787059683"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-300 via-white to-purple-300">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              AGE SNAP
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A versatile tool to explore everything about age. Calculate exact
              age, find the gap between two dates, countdown to your next
              birthday, or find a birth year.
            </p>
          </div>

          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex justify-center">{renderActiveComponent()}</div>

          {/* ✅ AdSense Ad */}
          <div className="my-10 flex justify-center w-full" ref={adRef}>
            <ins
              className="adsbygoogle"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "600px", // ✅ ensure enough width
                minWidth: "250px",
              }}
              data-ad-format="fluid"
              data-ad-layout-key="-fb+5w+4e-db+86"
              data-ad-client="ca-pub-3738297787059683"
              data-ad-slot="9651419496"
            ></ins>
          </div>

          <footer className="bg-slate-800 text-center text-sm text-gray-100 fixed bottom-0 w-full left-0 p-0">
            <p>
              &copy; 2025 <strong>Noriel Gecolea</strong>. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
