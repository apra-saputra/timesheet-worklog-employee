import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface ChartComponentProps {
  className?: string;
}

const chartConfig = {
  project_a: {
    label: "Project A",
    color: "#5bbeba",
  },
  project_b: {
    label: "Project B",
    color: "#4769c7",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", project_a: 186, project_b: 80 },
  { month: "February", project_a: 305, project_b: 200 },
  { month: "March", project_a: 237, project_b: 120 },
  { month: "April", project_a: 73, project_b: 190 },
  { month: "May", project_a: 209, project_b: 130 },
  { month: "June", project_a: 214, project_b: 140 },
];

const ChartComponent: React.FC<ChartComponentProps> = ({ className }) => {
  return (
    <Card className={cn(className, "min-h-[40rem]")}>
      <CardHeader>
        <h2 className="text-center font-medium text-xl">Chart</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="project_a" fill="var(--color-project_a)" radius={4} />
            <Bar dataKey="project_b" fill="var(--color-project_b)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
