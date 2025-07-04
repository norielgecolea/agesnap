
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
  const [result, setResult] = useState<AgeGapResult | null>(null);

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
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Age Gap Calculator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Calculate the time difference between two dates.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="date1" className="text-sm font-medium text-gray-700">
                First Date:
              </Label>
              <div className="relative mt-1">
                <Input
                  id="date1"
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div>
              <Label htmlFor="date2" className="text-sm font-medium text-gray-700">
                Second Date:
              </Label>
              <div className="relative mt-1">
                <Input
                  id="date2"
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <Button
              onClick={calculateAgeGap}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!date1 || !date2}
            >
              Calculate Gap
            </Button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Age Gap:
              </h3>
              <div className="flex justify-center items-baseline gap-4">
                <div>
                  <span className="text-4xl font-bold text-blue-600">{result.years}</span>
                  <span className="text-lg text-gray-600"> years</span>
                </div>
                <div>
                  <span className="text-4xl font-bold text-green-600">{result.months}</span>
                  <span className="text-lg text-gray-600"> months</span>
                </div>
                <div>
                  <span className="text-4xl font-bold text-purple-600">{result.days}</span>
                  <span className="text-lg text-gray-600"> days</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
