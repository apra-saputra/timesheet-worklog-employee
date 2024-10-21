import { User, Worklog } from "@/types/types";

// Dummy users array
const users: User[] = [
  {
    id: "12dj1mxn102e",
    name: "John Doe",
    email: "johndoe@email.com",
    password: "$2a$10$oAQJ8As9VCdjFKItbGAoj.r8IdGP6FNhHO21VB9qTa3pCebpX5v32",
  },
  {
    id: "adwewcc1213",
    name: "Michael",
    email: "michael@email.com",
    password: "$2a$10$oAQJ8As9VCdjFKItbGAoj.r8IdGP6FNhHO21VB9qTa3pCebpX5v32",
  },
  {
    id: "3fshj56sdhf",
    name: "Emily Johnson",
    email: "emily@email.com",
    password: "$2a$10$oAQJ8As9VCdjFKItbGAoj.r8IdGP6FNhHO21VB9qTa3pCebpX5v32",
  },
  {
    id: "34dwfwe12g4",
    name: "Jane Smith",
    email: "jane@email.com",
    password: "$2a$10$oAQJ8As9VCdjFKItbGAoj.r8IdGP6FNhHO21VB9qTa3pCebpX5v32",
  },
];

// Dummy worklogs array
export const dummyWorklogs: Worklog[] = [
  {
    id: 1,
    user: users[0], // John Doe
    project: { id: 1, name: "Project A", location: "A" },
    hoursWorked: 8,
    date: "2024-10-01T08:00:00Z",
  },
  {
    id: 2,
    user: users[1], // Michael
    project: { id: 2, name: "Project B", location: "B" },
    hoursWorked: 4,
    date: "2024-10-01T12:00:00Z",
  },
  {
    id: 3,
    user: users[0], // John Doe
    project: { id: 1, name: "Project A", location: "A" },
    hoursWorked: 6,
    date: "2024-10-02T08:00:00Z",
  },
  {
    id: 4,
    user: users[2], // Emily Johnson
    project: { id: 2, name: "Project B", location: "B" },
    hoursWorked: 8,
    date: "2024-10-03T08:00:00Z",
  },
  {
    id: 5,
    user: users[3], // Jane Smith
    project: { id: 1, name: "Project A", location: "A" },
    hoursWorked: 5,
    date: "2024-10-04T09:00:00Z",
  },
  {
    id: 6,
    user: users[0], // John Doe
    project: { id: 2, name: "Project B", location: "B" },
    hoursWorked: 7,
    date: "2024-10-05T10:00:00Z",
  },
  {
    id: 7,
    user: users[2], // Emily Johnson
    project: { id: 1, name: "Project A", location: "A" },
    hoursWorked: 8,
    date: "2024-10-06T11:00:00Z",
  },
  {
    id: 8,
    user: users[3], // Jane Smith
    project: { id: 2, name: "Project B", location: "B" },
    hoursWorked: 4,
    date: "2024-10-07T12:00:00Z",
  },
  {
    id: 9,
    user: users[0], // John Doe
    project: { id: 1, name: "Project A", location: "A" },
    hoursWorked: 8,
    date: "2024-10-08T08:00:00Z",
  },
  {
    id: 10,
    user: users[2], // Emily Johnson
    project: { id: 2, name: "Project B", location: "B" },
    hoursWorked: 6,
    date: "2024-10-09T08:00:00Z",
  },
];

// Dummy projects array
export const projects = [
  {
    id: "9418fc1a-6a88-45b2-9209-62b49bfca83d",
    name: "Project A",
    location: "Solo",
  },
  {
    id: "215a2d80-f298-4d1d-ab26-16b30a527b22",
    name: "Project B",
    location: "Semarang",
  },
];
