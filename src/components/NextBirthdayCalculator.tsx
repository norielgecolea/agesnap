
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface CountdownResult {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function NextBirthdayCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [countdown, setCountdown] = useState&lt;CountdownResult | null&gt;(null);
  const [intervalId, setIntervalId] = useState&lt;NodeJS.Timeout | null&gt;(null);

  const calculateNextBirthday = () => {
    if (!birthDate) return;

    if (intervalId) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      const today = new Date();
      const birth = new Date(birthDate);
      const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

      if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      const diff = nextBirthday.getTime() - today.getTime();

      if (diff > 0) {
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ months, days, hours, minutes, seconds });
      } else {
        setCountdown({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    &lt;div className="w-full max-w-2xl mx-auto"&gt;
      &lt;Card className="shadow-lg dark:bg-gray-800/40"&gt;
        &lt;CardHeader className="text-center pb-6"&gt;
          &lt;CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100"&gt;
            Next Birthday Countdown
          &lt;/CardTitle&gt;
          &lt;p className="text-gray-600 dark:text-gray-400 mt-2"&gt;
            See how long until your next birthday!
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

            &lt;Button
              onClick={calculateNextBirthday}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!birthDate}
            &gt;
              Start Countdown
            &lt;/Button&gt;
          &lt;/div&gt;

          {countdown && (
            &lt;div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"&gt;
              &lt;h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center"&gt;
                Countdown to your next birthday:
              &lt;/h3&gt;
              &lt;div className="grid grid-cols-2 md:grid-cols-5 gap-4"&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm text-center"&gt;
                  &lt;div className="text-2xl font-bold text-blue-600 dark:text-blue-400"&gt;{countdown.months}&lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Months&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm text-center"&gt;
                  &lt;div className="text-2xl font-bold text-green-600 dark:text-green-400"&gt;{countdown.days}&lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Days&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm text-center"&gt;
                  &lt;div className="text-2xl font-bold text-orange-600 dark:text-orange-400"&gt;{countdown.hours}&lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Hours&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm text-center"&gt;
                  &lt;div className="text-2xl font-bold text-red-600 dark:text-red-400"&gt;{countdown.minutes}&lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Minutes&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-white/80 dark:bg-gray-700/50 p-4 rounded-md shadow-sm text-center"&gt;
                  &lt;div className="text-2xl font-bold text-pink-600 dark:text-pink-400"&gt;{countdown.seconds}&lt;/div&gt;
                  &lt;div className="text-sm text-gray-600 dark:text-gray-400"&gt;Seconds&lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          )}
        &lt;/CardContent&gt;
      &lt;/Card&gt;
    &lt;/div&gt;
  );
}
