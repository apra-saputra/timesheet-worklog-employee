import SelectComponent from "@/components/commons/SelectComponent";
import CardComponent from "@/components/dashboard/CardComponent";
import ChartComponent from "@/components/dashboard/ChartComponent";
import TableComponent from "@/components/dashboard/TableComponent";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MonthlyReportType, ViewLogOutputType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const { toast } = useToast();

  const userId = "6d22b435-7318-41b9-9f87-477fbdd37f56";

  const [data, setData] = useState<ViewLogOutputType[]>([]);
  const [cardData, setCardData] = useState<MonthlyReportType[]>([]);
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth());

  const useMonths = () => {
    return useMemo(() => {
      const months = [
        { id: 0, name: "January" },
        { id: 1, name: "February" },
        { id: 2, name: "March" },
        { id: 3, name: "April" },
        { id: 4, name: "May" },
        { id: 5, name: "June" },
        { id: 6, name: "July" },
        { id: 7, name: "August" },
        { id: 8, name: "September" },
        { id: 9, name: "October" },
        { id: 10, name: "November" },
        { id: 11, name: "December" },
      ];
      return months;
    }, []);
  };

  const handleFetchTable = async () => {
    try {
      const { data } = await axios.get("/api/logs", {
        params: {
          userId,
          month: filterMonth + 1,
          year: new Date().getFullYear(),
        },
      });
      const logs = data.logs;
      setData(logs);
    } catch (error) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Ooops something wrong",
        description: err.message.toString(),
        duration: 1000 * 5,
      });
    }
  };

  const handleFetchPerMonth = async () => {
    try {
      const { data } = await axios.get("/api/projects", {
        params: {
          userId,
          month: filterMonth + 1,
          year: new Date().getFullYear(),
        },
      });
      const report = data.report;

      setCardData(report);
    } catch (error) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Ooops something wrong",
        description: err.message.toString(),
        duration: 1000 * 5,
      });
    }
  };

  useEffect(() => {
    handleFetchTable();
    if (userId) handleFetchPerMonth();
  }, [userId, filterMonth]);

  return (
    <div className="w-full h-full">
      <Card className="mb-4 w-full flex flex-row items-center justify-between py-4 px-6">
        <CardHeader className="flex min-w-[200px] p-0">
          <Label className="w-1/4">Month</Label>
          <SelectComponent
            data={useMonths()}
            variable={filterMonth}
            onChange={(val) => setFilterMonth(Number(val))}
            placeholder="Select Month"
          />
        </CardHeader>
        <Button>Insert New Record</Button>
      </Card>
      <div className="w-full h-full flex flex-col md:flex-row items-start justify-center md:item-center md:justify-start gap-4">
        <section className="grid w-full grid-cols-1 gap-4 transition-all md:grid-cols-2 xl:grid-cols-2 h-full">
          {cardData.map((data, index) => (
            <CardComponent key={index} {...data} />
          ))}
          <ChartComponent className="col-span-2 auto-rows-fr" />
        </section>
        <section className="grid w-full grid-cols-1 transition-all">
          <TableComponent worklogs={data} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
