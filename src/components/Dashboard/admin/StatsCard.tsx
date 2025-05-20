import { Card } from "@/components/ui/card";
import React from "react";

const StatsCard = ({
  icon,
  title,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
}) => {
  return (
    <Card
      className={`relative rounded-2xl shadow-lg border-none text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] ${bgColor}`}
    >
      {/* Icon - subtle large background */}
      <div className="absolute top-3 right-4 opacity-20 text-6xl">
        {icon}
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-center items-start p-6 space-y-3 z-10 relative">
        <div className="text-4xl">{icon}</div>

        <h3 className="text-lg font-semibold tracking-wide">{title}</h3>

        <p className="text-3xl font-bold">{value}</p>
      </div>
    </Card>
  );
};

export default StatsCard;
