
import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "exact-age", label: "Exact Age" },
    { id: "age-gap", label: "Age Gap" },
    { id: "next-birthday", label: "Next Birthday" },
    { id: "birth-year", label: "Birth Year" },
  ];

  return (
    &lt;div className="flex flex-wrap justify-center gap-2 mb-8"&gt;
      {tabs.map((tab) => (
        &lt;Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === tab.id
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-transparent hover:bg-blue-100/50 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700"
          }`}
        &gt;
          {tab.label}
        &lt;/Button&gt;
      ))}
    &lt;/div&gt;
  );
}
