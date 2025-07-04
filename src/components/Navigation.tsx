
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "exact-age", label: "Exact Age" },
    { id: "legacy", label: "Legacy" },
    { id: "countdown", label: "Countdown" },
    { id: "universal", label: "Universal" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === tab.id
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-transparent hover:bg-blue-50 text-gray-600 border-gray-300"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
