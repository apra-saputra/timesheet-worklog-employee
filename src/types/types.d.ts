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

export type ViewLogOutputType = {
  id: string;
  userName: string; // Nama pengguna
  projects: string[]; // Daftar nama proyek
  workdate: string; // Tanggal kerja dalam format YYYY-MM-DD
  complete: boolean; // Status apakah total jam kerja mencapai 8 jam
  detail: {
    [projectName: string]: number; // Detail jam kerja per proyek
  };
};

import { PrismaClient } from "@prisma/client";

export declare global {
  let prisma: PrismaClient | undefined;
}
