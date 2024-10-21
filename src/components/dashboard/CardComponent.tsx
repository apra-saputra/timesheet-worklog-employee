import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { IconType } from "react-icons/lib";
import { MonthlyReportType } from "@/types/types";
import { FaRegCalendarCheck } from "react-icons/fa6";

interface CardProps extends MonthlyReportType {}

const CardComponent: React.FC<CardProps> = ({ ...props }) => {
  const getDescription = () => {
    let text = "";

    if (props.percentageChange) {
      if (Math.sign(props.percentageChange) === -1) {
        // Jika percentageChange negatif
        text = `${props.percentageChange}% from prev month`;
      } else {
        // Jika percentageChange positif
        text = `+${props.percentageChange}% from prev month`;
      }
    } else {
      // Jika tidak ada percentageChange
      text = "No change from prev month";
    }

    return text;
  };
  return (
    <Card className="bg-secondary w-full h-full p-0">
      <CardHeader className="flex flex-row justify-between gap-2">
        {/* label */}
        <p className="text-sm">{props.projectName}</p>
        {/* icon */}
        <FaRegCalendarCheck />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid w-full grid-flow-row grid-cols-3 place-items-center">
          <p>Absences</p>
          <p>Avarge Hours</p>
          <p>Total Hours</p>
          <h3 className="text-2xl font-semibold">{props.absences}</h3>
          <h3 className="text-2xl font-semibold">{props.averageHoursPerDay}</h3>
          <h3 className="text-2xl font-semibold">{props.totalHoursWorked}</h3>
        </div>
        <p className="text-xs text-gray-500">{getDescription()}</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
