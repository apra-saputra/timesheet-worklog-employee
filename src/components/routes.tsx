// Auth Imports
import { IRoute } from "@/types/types";
import { HiOutlineHome, HiOutlineCpuChip } from "react-icons/hi2";

export const routes: IRoute[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
  },
  {
    name: "Create",
    path: "/admin/create",
    icon: (
      <HiOutlineCpuChip className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
  },
];
