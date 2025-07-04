
import React, { useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import AgeCalculator from "@/components/AgeCalculator";
import AgeGapCalculator from "@/components/AgeGapCalculator";
import NextBirthdayCalculator from "@/components/NextBirthdayCalculator";
import BirthYearCalculator from "@/components/BirthYearCalculator";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [activeTab, setActiveTab] = useState("exact-age");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "exact-age":
        return &lt;AgeCalculator /&gt;;
      case "age-gap":
        return &lt;AgeGapCalculator /&gt;;
      case "next-birthday":
        return &lt;NextBirthdayCalculator /&gt;;
      case "birth-year":
        return &lt;BirthYearCalculator /&gt;;
      default:
        return &lt;AgeCalculator /&gt;;
    }
  };

  return (
    &lt;&gt;
      &lt;Head&gt;
        &lt;title&gt;AgeSnap - Age Calculator&lt;/title&gt;
        &lt;meta name="description" content="Calculate your exact age, find age gaps, countdown to birthdays, and determine birth years with AgeSnap" /&gt;
        &lt;link rel="icon" href="/favicon.ico" /&gt;
      &lt;/Head&gt;

      &lt;main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-blue-900 text-gray-800 dark:text-gray-200"&gt;
        &lt;div className="container mx-auto px-4 py-8 max-w-6xl"&gt;
          &lt;header className="flex justify-between items-start mb-8"&gt;
            &lt;div className="flex-1"&gt;&lt;/div&gt;
            &lt;div className="text-center flex-1"&gt;
              &lt;h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4"&gt;
                Age Calculator
              &lt;/h1&gt;
              &lt;p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"&gt;
                A versatile tool to explore everything about age. Calculate exact age, find the gap between two dates, countdown to your next birthday, or find a birth year.
              &lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="flex-1 flex justify-end"&gt;
              &lt;ThemeToggle /&gt;
            &lt;/div&gt;
          &lt;/header&gt;

          &lt;Navigation activeTab={activeTab} onTabChange={setActiveTab} /&gt;

          &lt;div className="flex justify-center"&gt;
            {renderActiveComponent()}
          &lt;/div&gt;

          &lt;footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm"&gt;
            &lt;p&gt;&copy; 2025 AgeSnap. Calculate time with precision.&lt;/p&gt;
          &lt;/footer&gt;
        &lt;/div&gt;
      &lt;/main&gt;
    &lt;/&gt;
  );
}
