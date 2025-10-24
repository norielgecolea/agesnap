"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import AgeCalculator from "@/components/AgeCalculator";
import AgeGapCalculator from "@/components/AgeGapCalculator";
import NextBirthdayCalculator from "@/components/NextBirthdayCalculator";
import BirthYearCalculator from "@/components/BirthYearCalculator";
import AdUnit from "@/components/Adunit";
export default function Home() {
  const [activeTab, setActiveTab] = useState("exact-age");

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
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-300 via-white to-purple-300">

        <div className="flex justify-center my-4">
          <AdUnit />
        </div>
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
