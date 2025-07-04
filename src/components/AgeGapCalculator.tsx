
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface AgeGapResult {
  years: number;
  months: number;
  days: number;
}

export default function AgeGapCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState&lt;AgeGapResult | null&gt;(null);

  const calculateAgeGap = () => {
    if (!date1 || !date2) return;

    let d1 = new Date(date1);
    let d2 = new Date(date2);

    if (d1 > d2) {
      [d1, d2] = [d2, d1]; // Swap dates if d1 is after d2
    }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    &lt;div className="w-full max-w-2xl mx-auto"&gt;
      &lt;Card className="shadow-lg dark:bg-gray-800/40"&gt;
        &lt;CardHeader className="text-center pb-6"&gt;
          &lt;CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100"&gt;
            Age Gap Calculator
          &lt;/CardTitle&gt;
          &lt;p className="text-gray-600 dark:text-gray-400 mt-2"&gt;
            Calculate the time difference between two dates.
          &lt;/p&gt;
        &lt;/CardHeader&gt;
        &lt;CardContent className="space-y-6"&gt;
          &lt;div className="space-y-4"&gt;
            &lt;div&gt;
              &lt;Label htmlFor="date1" className="text-sm font-medium text-gray-700 dark:text-gray-300"&gt;
                First Date:
              &lt;/Label&gt;
              &lt;div className="relative mt-1"&gt;
                &lt;Input
                  id="date1"
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full pl-10"
                /&gt;
                &lt;Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            &lt;div&gt;
              &lt;Label htmlFor="date2" className="text-sm font-medium text-gray-700 dark:text-gray-300"&gt;
                Second Date:
              &lt;/Label&gt;
              &lt;div className="relative mt-1"&gt;
                &lt;Input
                  id="date2"
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full pl-10"
                /&gt;
                &lt;Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            &lt;Button
              onClick={calculateAgeGap}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!date1 || !date2}
            &gt;
              Calculate Gap
            &lt;/Button&gt;
          &lt;/div&gt;

          {result && (
            &lt;div className="mt-8 p-6 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center"&gt;
              &lt;h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"&gt;
                Age Gap:
              &lt;/h3&gt;
              &lt;div className="flex justify-center items-baseline gap-4"&gt;
                &lt;div&gt;
                  &lt;span className="text-4xl font-bold text-blue-600 dark:text-blue-400"&gt;{result.years}&lt;/span&gt;
                  &lt;span className="text-lg text-gray-600 dark:text-gray-400"&gt; years&lt;/span&gt;
                &lt;/div&gt;
                &lt;div&gt;
                  &lt;span className="text-4xl font-bold text-green-600 dark:text-green-400"&gt;{result.months}&lt;/span&gt;
                  &lt;span className="text-lg text-gray-600 dark:text-gray-400"&gt; months&lt;/span&gt;
                &lt;/div&gt;
                &lt;div&gt;
                  &lt;span className="text-4xl font-bold text-purple-600 dark:text-purple-400"&gt;{result.days}&lt;/span&gt;
                  &lt;span className="text-lg text-gray-600 dark:text-gray-400"&gt; days&lt;/span&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          )}
        &lt;/CardContent&gt;
      &lt;/Card&gt;
    &lt;/div&gt;
  );
}
