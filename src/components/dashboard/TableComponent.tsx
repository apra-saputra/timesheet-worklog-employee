import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Worklog } from "@/types/types";
import { formattedDate } from "@/utils/format/formatted-date";

interface TableComponentProps {
  worklogs: Worklog[];
  className?: string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  worklogs,
  className,
}) => {
  const headers = ["User", "Project", "Location", "Hours Worked", "Date"];

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
                className="border-b-2 border-b-slate-200 h-12 text-center w-full"
              >
                <TableDataComponent text={worklog.user.name} />
                <TableDataComponent text={worklog.project.name} />
                <TableDataComponent text={worklog.project.location} />
                <TableDataComponent text={worklog.hoursWorked.toString()} />
                <TableDataComponent
                  text={formattedDate(worklog.dateWorked.toString())}
                />
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
}: {
  text: string;
  isHeader?: boolean;
}) => {
  const commonStyle = "px-4 py-2";
  return isHeader ? (
    <th className={commonStyle}>{text}</th>
  ) : (
    <td className={commonStyle}>{text}</td>
  );
};

export default TableComponent;
