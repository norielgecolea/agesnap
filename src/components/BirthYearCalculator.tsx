
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function BirthYearCalculator() {
  const [age, setAge] = useState("");
  const [birthYear, setBirthYear] = useState&lt;number | null&gt;(null);

  const calculateBirthYear = () => {
    if (!age) return;

    const currentYear = new Date().getFullYear();
    const calculatedBirthYear = currentYear - parseInt(age);
    setBirthYear(calculatedBirthYear);
  };

  return (
    &lt;div className="w-full max-w-2xl mx-auto"&gt;
      &lt;Card className="shadow-lg dark:bg-gray-800/40"&gt;
        &lt;CardHeader className="text-center pb-6"&gt;
          &lt;CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100"&gt;
            Birth Year Calculator
          &lt;/CardTitle&gt;
          &lt;p className="text-gray-600 dark:text-gray-400 mt-2"&gt;
            Find out the birth year based on an age.
          &lt;/p&gt;
        &lt;/CardHeader&gt;
        &lt;CardContent className="space-y-6"&gt;
          &lt;div className="space-y-4"&gt;
            &lt;div&gt;
              &lt;Label htmlFor="age" className="text-sm font-medium text-gray-700 dark:text-gray-300"&gt;
                Enter Age:
              &lt;/Label&gt;
              &lt;Input
                id="age"
                type="number"
                placeholder="e.g., 25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full"
              /&gt;
            &lt;/div&gt;

            &lt;Button
              onClick={calculateBirthYear}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!age}
            &gt;
              Calculate Birth Year
            &lt;/Button&gt;
          &lt;/div&gt;

          {birthYear !== null && (
            &lt;div className="mt-6 p-6 bg-green-500/10 rounded-lg border border-green-500/20 text-center"&gt;
              &lt;h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"&gt;
                Estimated Birth Year:
              &lt;/h3&gt;
              &lt;div className="text-4xl font-bold text-green-600 dark:text-green-400"&gt;
                {birthYear}
              &lt;/div&gt;
            &lt;/div&gt;
          )}
        &lt;/CardContent&gt;
      &lt;/Card&gt;
    &lt;/div&gt;
  );
}
