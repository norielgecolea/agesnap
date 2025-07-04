
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function BirthYearCalculator() {
  const [age, setAge] = useState("");
  const [birthYear, setBirthYear] = useState<number | null>(null);

  const calculateBirthYear = () => {
    if (!age) return;

    const currentYear = new Date().getFullYear();
    const calculatedBirthYear = currentYear - parseInt(age);
    setBirthYear(calculatedBirthYear);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Birth Year Calculator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Find out the birth year based on an age.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                Enter Age:
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              onClick={calculateBirthYear}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!age}
            >
              Calculate Birth Year
            </Button>
          </div>

          {birthYear !== null && (
            <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Estimated Birth Year:
              </h3>
              <div className="text-4xl font-bold text-green-600">
                {birthYear}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
