
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
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);

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
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Exact Age Calculator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Calculate your exact age in years, months, and days.
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

            <div>
              <Label htmlFor="currentDate" className="text-sm font-medium text-gray-700">
                Current Date (or select another date):
              </Label>
              <div className="relative mt-1">
                <Input
                  id="currentDate"
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-full pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <Button
              onClick={calculateAge}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!birthDate || !currentDate}
            >
              Calculate Age
            </Button>
          </div>

          {ageResult && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Age Results:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">
                    {ageResult.years}
                  </div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="text-2xl font-bold text-green-600">
                    {ageResult.months}
                  </div>
                  <div className="text-sm text-gray-600">Months</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">
                    {ageResult.days}
                  </div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">
                    {ageResult.totalDays.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Days</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="text-xl font-bold text-teal-600">
                    {ageResult.totalWeeks.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Weeks</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="text-xl font-bold text-pink-600">
                    {ageResult.totalMonths}
                  </div>
                  <div className="text-sm text-gray-600">Total Months</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
