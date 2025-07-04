
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeUnit {
  label: string;
  value: string;
  multiplier: number;
}

export default function UniversalCalculator() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const timeUnits: TimeUnit[] = [
    { label: "Seconds", value: "seconds", multiplier: 1 },
    { label: "Minutes", value: "minutes", multiplier: 60 },
    { label: "Hours", value: "hours", multiplier: 3600 },
    { label: "Days", value: "days", multiplier: 86400 },
    { label: "Weeks", value: "weeks", multiplier: 604800 },
    { label: "Months", value: "months", multiplier: 2629746 },
    { label: "Years", value: "years", multiplier: 31556952 },
  ];

  const convertTime = () => {
    if (!inputValue || !fromUnit || !toUnit) return;

    const fromMultiplier = timeUnits.find(unit => unit.value === fromUnit)?.multiplier || 1;
    const toMultiplier = timeUnits.find(unit => unit.value === toUnit)?.multiplier || 1;

    const valueInSeconds = parseFloat(inputValue) * fromMultiplier;
    const convertedValue = valueInSeconds / toMultiplier;

    setResult(convertedValue);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Universal Time Converter
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Convert between different time units.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="inputValue" className="text-sm font-medium text-gray-700">
                Value to Convert:
              </Label>
              <Input
                id="inputValue"
                type="number"
                placeholder="Enter a number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">From:</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">To:</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={convertTime}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              disabled={!inputValue || !fromUnit || !toUnit}
            >
              Convert
            </Button>
          </div>

          {result !== null && (
            <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Conversion Result:
              </h3>
              <div className="text-2xl font-bold text-blue-600">
                {inputValue} {timeUnits.find(u => u.value === fromUnit)?.label.toLowerCase()} = 
              </div>
              <div className="text-3xl font-bold text-green-600 mt-2">
                {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {timeUnits.find(u => u.value === toUnit)?.label.toLowerCase()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
