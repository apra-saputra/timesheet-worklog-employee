import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ViewLogOutputType } from "@/types/types";

interface TableComponentProps {
  worklogs: ViewLogOutputType[];
  className?: string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  worklogs,
  className,
}) => {
  const headers = [
    "User",
    "Projects",
    "Date",
    "Point per day",
    "Detail work hours",
  ];

  const handleDetail = (obj: Record<string, string | number>): string => {
    let text = "";

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        text += `${key}: ${value}\n`;
      }
    }

    return text.trim();
  };

  return (
    <Card className={cn(className, "w-full min-h-[53rem]")}>
      <CardHeader className="mb-10">
        <h2 className="text-center font-medium text-xl">Worklog</h2>
      </CardHeader>
      <CardContent className="relative w-full">
        <table className="overflow-auto w-full">
          <thead className="border-b-2 border-b-primary w-full">
            <tr className="p-8 text-lg capitalize text-center">
              {headers.map((header) => (
                <TableDataComponent text={header} key={header} />
              ))}
            </tr>
          </thead>
          <tbody>
            {worklogs.map((worklog) => (
              <tr
                key={worklog.id}
                className="border-b-2 border-b-slate-200/20 h-12 text-center w-full"
              >
                <TableDataComponent text={worklog.userName} />
                <TableDataComponent text={worklog.projects.join(", ")} />
                <TableDataComponent text={worklog.workdate} />
                <TableDataComponent
                  text={worklog.complete ? "1" : "0"}
                  className={!worklog.complete ? "text-destructive" : undefined}
                />
                <TableDataComponent text={handleDetail(worklog.detail)} />
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

const TableDataComponent = ({
  text,
  isHeader,
  className,
}: {
  text: string;
  isHeader?: boolean;
  className?: string;
}) => {
  const commonStyle = "px-4 py-2";
  return isHeader ? (
    <th className={cn(commonStyle, className)}>{text}</th>
  ) : (
    <td className={cn(commonStyle, className)}>{text}</td>
  );
};

export default TableComponent;
