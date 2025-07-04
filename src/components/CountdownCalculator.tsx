
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface CountdownResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownCalculator() {
  const [targetDate, setTargetDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [countdown, setCountdown] = useState<CountdownResult | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && targetDate) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference > 0) {
          const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
          const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
          const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setCountdown({ years, months, days, hours, minutes, seconds });
        } else {
          setCountdown({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
          setIsActive(false);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, targetDate]);

  const startCountdown = () => {
    if (!targetDate) return;
    setIsActive(true);
  };

  const stopCountdown = () => {
    setIsActive(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Countdown Calculator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Count down to any future date or event.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="eventName" className="text-sm font-medium text-gray-700">
                Event Name (Optional):
              </Label>
              <Input
                id="eventName"
                type="text"
                placeholder="e.g., My Birthday, Wedding Day, Vacation"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="targetDate" className="text-sm font-medium text-gray-700">
                Target Date:
              </Label>
              <div className="relative mt-1">
                <Input
                  id="targetDate"
                  type="datetime-local"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={startCountdown}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium"
                disabled={!targetDate || isActive}
              >
                Start Countdown
              </Button>
              <Button
                onClick={stopCountdown}
                variant="outline"
                className="flex-1 py-2 px-4 rounded-md font-medium"
                disabled={!isActive}
              >
                Stop
              </Button>
            </div>
          </div>

          {countdown && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              {eventName && (
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Countdown to {eventName}:
                </h3>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {countdown.years}
                  </div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {countdown.months}
                  </div>
                  <div className="text-sm text-gray-600">Months</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {countdown.days}
                  </div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {countdown.hours}
                  </div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {countdown.minutes}
                  </div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm text-center">
                  <div className="text-2xl font-bold text-pink-600">
                    {countdown.seconds}
                  </div>
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
