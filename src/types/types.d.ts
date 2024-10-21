export interface IRoute {
  path: string;
  name: string;
  layout?: string;
  exact?: boolean;
  component?: ComponentType;
  disabled?: boolean;
  icon?: JSX.Element;
  secondary?: boolean;
  collapse?: boolean;
  items?: IRoute[];
  rightElement?: boolean;
  invisible?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Project {
  id: number;
  name: string;
  location: string;
}

export interface Worklog {
  id: number;
  user: User;
  project: Project;
  hoursWorked: number;
  dateWorked: string; // ISO string for the date
}

export type MonthlyReportType = {
  projectId: string;
  projectName: string;
  totalHoursWorked: number;
  averageHoursPerDay: number;
  absences: number;
  percentageChange: number | null;
};

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // Anda bisa menggunakan | null juga
}
