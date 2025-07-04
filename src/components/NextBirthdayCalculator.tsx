
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
  const [countdown, setCountdown] = useState<CountdownResult | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const calculateNextBirthday = () => {
    if (!birthDate) return;

    if (intervalId) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      const today = new Date();
      const birth = new Date(birthDate);
      let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

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
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Next Birthday Countdown
          </CardTitle>
          <p className="text-gray-600 mt-2">
            See how long until your next birthday!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                Your Birth Date:
              </Label>
              <div className="relative mt-1">
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <Button
              onClick={calculateNextBirthday}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!birthDate}
            >
              Start Countdown
            </Button>
          </div>

          {countdown && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Countdown to your next birthday:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-blue-600">{countdown.months}</div>
                  <div className="text-sm text-gray-600">Months</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-green-600">{countdown.days}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-orange-600">{countdown.hours}</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-red-600">{countdown.minutes}</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-pink-600">{countdown.seconds}</div>
                  <div className="text-sm text-gray-600">Seconds</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
