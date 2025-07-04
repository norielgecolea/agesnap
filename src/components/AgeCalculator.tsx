
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ageResult, setAgeResult] = useState&lt;AgeResult | null&gt;(null);

  const calculateAge = () => {
    if (!birthDate || !currentDate) return;

    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth > current) {
      alert("Birth date cannot be in the future!");
      return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (current.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    setAgeResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
    });
  };

  return (
    &lt;div className="w-full max-w-2xl mx-auto"&gt;
      &lt;Card className="shadow-lg dark:bg-gray-800/40"&gt;
        &lt;CardHeader className="text-center pb-6"&gt;
          &lt;CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100"&gt;
            Exact Age Calculator
          &lt;/CardTitle&gt;
          &lt;p className="text-gray-600 dark:text-gray-400 mt-2"&gt;
            Calculate your exact age in years, months, and days.
          &lt;/p&gt;
        &lt;/CardHeader&gt;
        &lt;CardContent className="space-y-6"&gt;
          &lt;div className="space-y-4"&gt;
            &lt;div&gt;
              &lt;Label htmlFor="birthDate" className="text-sm font-medium text-gray-700 dark:text-gray-300"&gt;
                Your Birth Date:
              &lt;/Label&gt;
              &lt;div className="relative mt-1"&gt;
                &lt;Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-10"
                /&gt;
                &lt;Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            &lt;div&gt;
              &lt;Label htmlFor="currentDate" className="text-sm font-medium text-gray-700 dark:text-gray-300"&gt;
                Current Date (or select another date):
              &lt;/Label&gt;
              &lt;div className="relative mt-1"&gt;
                &lt;Input
                  id="currentDate"
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-full pl-10"
                /&gt;
                &lt;Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            &lt;Button
              onClick={calculateAge}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!birthDate || !currentDate}
            &gt;
              Calculate Age
            &lt;/Button&gt;
          &lt;/div&gt;

          {ageResult && (
            &lt;div className="mt-8 p-6 bg-blue-500/10 rounded-lg border border-blue-500/20"&gt;
              &lt;h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"&gt;
                Your Age Results:
              &lt;/h3&gt;
              &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm"&gt;
                  &lt;div className="text-2xl font-bold text-blue-600 dark:text-blue-400"&gt;
                    {ageResult.years}
                  &lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Years&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm"&gt;
                  &lt;div className="text-2xl font-bold text-green-600 dark:text-green-400"&gt;
                    {ageResult.months}
                  &lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Months&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm"&gt;
                  &lt;div className="text-2xl font-bold text-purple-600 dark:text-purple-400"&gt;
                    {ageResult.days}
                  &lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Days&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm"&gt;
                  &lt;div className="text-2xl font-bold text-orange-600 dark:text-orange-400"&gt;
                    {ageResult.totalDays.toLocaleString()}
                  &lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Total Days&lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm"&gt;
                  &lt;div className="text-xl font-bold text-teal-600 dark:text-teal-400"&gt;
                    {ageResult.totalWeeks.toLocaleString()}
                  &lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Total Weeks&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm"&gt;
                  &lt;div className="text-xl font-bold text-pink-600 dark:text-pink-400"&gt;
                    {ageResult.totalMonths}
                  &lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Total Months&lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          )}
        &lt;/CardContent&gt;
      &lt;/Card&gt;
    &lt;/div&gt;
  );
}
