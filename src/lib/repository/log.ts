import { MonthlyReportType, ViewLogOutputType } from "@/types/types";
import { prisma } from "../prisma";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

export const viewLog = async (
  userId: string,
  month: number,
  year: number
): Promise<ViewLogOutputType[]> => {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  const workLogs = await prisma.workLog.findMany({
    where: { userId, dateWorked: { gte: startDate, lte: endDate } },
    orderBy: { dateWorked: "desc" },
    select: {
      id: true,
      project: {
        select: {
          name: true,
        },
      },
      dateWorked: true,
      hoursWorked: true,
      detail: true,
    },
    take: 100,
  });

  const resultMap: {
    [key: string]: {
      id: string;
      projects: string[];
      workdate: string;
      complete: boolean;
      detail: { [key: string]: number };
    };
  } = {};

  workLogs.forEach((log) => {
    // Konversi dateWorked dari UTC ke tanggal lokal
    const localDate = new Date(log.dateWorked);
    const workDate = localDate.toLocaleDateString("en-CA"); // Menggunakan format YYYY-MM-DD

    const projectName = log.project.name;

    if (!resultMap[workDate]) {
      resultMap[workDate] = {
        id: log.id,
        projects: [],
        workdate: workDate,
        complete: false,
        detail: {},
      };
    }

    if (!resultMap[workDate].projects.includes(projectName)) {
      resultMap[workDate].projects.push(projectName);
    }

    if (!resultMap[workDate].detail[projectName]) {
      resultMap[workDate].detail[projectName] = 0;
    }
    resultMap[workDate].detail[projectName] += log.hoursWorked;

    const totalHoursForDay = Object.values(resultMap[workDate].detail).reduce(
      (acc, hours) => acc + hours,
      0
    );
    resultMap[workDate].complete = totalHoursForDay >= 8;
  });

  // Convert resultMap to an array and add userName
  const finalResult = Object.values(resultMap).map((entry) => ({
    userName: user?.name || "Unknown", // Use 'Unknown' if user name is not found
    ...entry,
  }));

  return finalResult;
};

type CreatePayloadType = {
  dateWorked: Date;
  hoursWorked: number; // max 8,
  userId: string;
  projectId: string;
  detail: string;
};

export const createLog = async (createPayload: CreatePayloadType) => {
  try {
    const startOfDay = new Date(createPayload.dateWorked);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(createPayload.dateWorked);
    endOfDay.setHours(23, 59, 59, 999);

    const existingLogs = await prisma.workLog.findMany({
      where: {
        userId: createPayload.userId,
        dateWorked: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const totalHoursWorked = existingLogs.reduce(
      (total, log) => total + log.hoursWorked,
      0
    );

    const newTotalHoursWorked = totalHoursWorked + createPayload.hoursWorked;

    if (newTotalHoursWorked > 8) {
      throw new Error(
        "Total hours worked for the day exceeds the maximum of 8 hours."
      );
    }

    const log = await prisma.workLog.create({
      data: {
        ...createPayload,
      },
    });

    return { message: "Success create log", log };
  } catch (error) {
    throw error;
  }
};

export const generateMonthlyReport = async (
  userId: string,
  month: number,
  year: number
): Promise<MonthlyReportType[]> => {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));

  const previousStartDate = startOfMonth(subMonths(startDate, 1));
  const previousEndDate = endOfMonth(subMonths(endDate, 1));

  const current = prisma.workLog.findMany({
    where: {
      userId: userId,
      dateWorked: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      dateWorked: true,
      hoursWorked: true,
    },
  });

  const previous = prisma.workLog.findMany({
    where: {
      userId: userId,
      dateWorked: {
        gte: previousStartDate,
        lte: previousEndDate,
      },
    },
    select: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      hoursWorked: true,
    },
  });

  const [currentLogs, previousLogs] = await Promise.all([current, previous]);

  const currentProjectsMap: {
    [key: string]: {
      projectName: string;
      totalHoursWorked: number;
      workDays: Set<string>;
    };
  } = {};

  currentLogs.forEach((log) => {
    const projectId = log.project.id;
    const projectName = log.project.name;
    const dateWorkedStr = log.dateWorked.toISOString().split("T")[0];

    if (!currentProjectsMap[projectId]) {
      currentProjectsMap[projectId] = {
        projectName,
        totalHoursWorked: 0,
        workDays: new Set(),
      };
    }

    currentProjectsMap[projectId].totalHoursWorked += log.hoursWorked;
    currentProjectsMap[projectId].workDays.add(dateWorkedStr);
  });

  // Group previous logs by project
  const previousProjectsMap: { [key: string]: number } = {};
  previousLogs.forEach((log) => {
    const projectId = log.project.id;

    if (!previousProjectsMap[projectId]) {
      previousProjectsMap[projectId] = 0;
    }

    previousProjectsMap[projectId] += log.hoursWorked;
  });

  // Calculate the number of workdays in the current month
  const allDaysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
  const today = new Date();
  const isTodayInMonth = today >= startDate && today <= endDate;

  const workdaysUntilToday = isTodayInMonth
    ? allDaysInMonth.filter(
        (day) => day <= today && !(day.getDay() === 0 || day.getDay() === 6)
      ).length
    : allDaysInMonth.filter(
        (day) => !(day.getDay() === 0 || day.getDay() === 6)
      ).length;

  // Generate report with percentage change
  const report: MonthlyReportType[] = Object.entries(currentProjectsMap).map(
    ([projectId, projectData]) => {
      const workDaysCount = projectData.workDays.size;

      // Calculate absences based on whether today is included in the month
      const absences =
        workdaysUntilToday -
        (isTodayInMonth &&
        !projectData.workDays.has(today.toISOString().split("T")[0])
          ? workDaysCount - 1
          : workDaysCount);

      const averageHoursPerDay =
        workDaysCount > 0 ? projectData.totalHoursWorked / workDaysCount : 0;

      // Get the total hours from the previous month for the same project
      const previousTotalHours = previousProjectsMap[projectId] || 0;

      // Calculate the percentage change
      let percentageChange: number | null = null;
      if (previousTotalHours > 0) {
        percentageChange =
          ((projectData.totalHoursWorked - previousTotalHours) /
            previousTotalHours) *
          100;
      }

      return {
        projectId,
        projectName: projectData.projectName,
        totalHoursWorked: projectData.totalHoursWorked,
        averageHoursPerDay: Number.isFinite(averageHoursPerDay)
          ? averageHoursPerDay
          : 0,
        absences,
        percentageChange,
      };
    }
  );

  return report;
};
