import CardComponent from "@/components/dashboard/CardComponent";
import ChartComponent from "@/components/dashboard/ChartComponent";
import TableComponent from "@/components/dashboard/TableComponent";
import { useToast } from "@/hooks/use-toast";
import { MonthlyReportType, Worklog } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { toast } = useToast();

  const userId = "6d22b435-7318-41b9-9f87-477fbdd37f56";

  const [data, setData] = useState<Worklog[]>([]);
  const [cardData, setCardData] = useState<MonthlyReportType[]>([]);

  const handleFetchTable = async () => {
    try {
      const { data } = await axios.get("/api/logs", { params: { userId } });
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
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
      });
      const report = data.report;
      console.log(report);
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
  }, [userId]);

  return (
    <div className="w-full h-full">
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
