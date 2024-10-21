import { useState, useEffect } from "react";

type DataChartInput = { date: string; value: number }[]; // date in ISO format
type DataChartOutput = { name: string; value: number }[];

// Hook untuk mengenerate data chart sekaligus nama bulan
export function useGenerateDataChart(data: DataChartInput): DataChartOutput {
  const [dataChart, setDataChart] = useState<DataChartOutput>([]);

  useEffect(() => {
    const monthData = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString("default", { month: "long" }),
      value: 0,
    }));

    const generatedData = data.reduce((acc, item) => {
      const date = new Date(item.date);
      const monthIndex = date.getMonth(); // Dapatkan index bulan (0-11)
      acc[monthIndex].value += item.value;
      return acc;
    }, monthData);

    setDataChart(generatedData);
  }, [data]);

  return dataChart;
}
