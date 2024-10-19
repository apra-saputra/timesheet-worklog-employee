"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "@/components/scrollbar/Scrollbar";
import Links from "./components/Links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { IRoute } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { HiX } from "react-icons/hi";
import { HiBolt } from "react-icons/hi2";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

export interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

function Sidebar(props: SidebarProps) {
  //   const router = getRedirectMethod() === "client" ? useRouter() : null;
  const { routes } = props;

  const handleSignOut = async () => {
    // e.preventDefault();
    // supabase.auth.signOut();
    // router.push("/dashboard/signin");
  };
  // SIDEBAR
  return (
    <div
      className={`lg:!z-99 fixed !z-[99] min-h-full w-[300px] transition-all md:!z-[99] xl:!z-0 ${
        props.variant === "auth" ? "xl:hidden" : "xl:block"
      } ${props.open ? "" : "-translate-x-[120%] xl:translate-x-[unset]"}`}
    >
      <Card
        className={`m-3 ml-3 h-[96.5vh] w-full overflow-hidden !rounded-lg pe-4 sm:my-4 sm:mr-4 md:m-5 md:mr-[-50px]`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute top-4 block cursor-pointer text-text dark:text-text xl:hidden"
                onClick={() => props.setOpen(false)}
              >
                <HiX />
              </span>
              <div className={`mt-8 flex items-center justify-center`}>
                <div className="me-2 flex h-[40px] w-[40px] items-center justify-center rounded-md bg-primary text-text dark:bg-primary dark:text-text">
                  <HiBolt className="h-5 w-5" />
                </div>
                <h5 className="me-2 text-2xl font-bold leading-5 text-text dark:text-text">
                  Admin Worksheet
                </h5>
              </div>
              <div className="mb-8 mt-8 h-px bg-background dark:bg-background" />
              {/* Nav item */}
              <ul>
                <Links routes={routes} />
              </ul>
            </div>
            {/* Free Horizon Card    */}
            <div className="mb-9 mt-7">
              {/* Sidebar profile info */}
              <div className="mt-5 flex w-full items-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <a href="/dashboard/dashboard/settings">
                  <Avatar className="min-h-10 min-w-10">
                    <AvatarImage
                      src={"https://avatar.iran.liara.run/public/boy"}
                    />
                    <AvatarFallback className="font-bold dark:text-zinc-950">
                      {/* {userDetails.full_name
                        ? `${userDetails.full_name[0]}`
                        : `${user?.user_metadata.email[0].toUpperCase()}`} */}
                    </AvatarFallback>
                  </Avatar>
                </a>
                <a href="/dashboard/settings">
                  <p className="ml-2 mr-3 flex items-center text-sm font-semibold leading-none text-text dark:text-text">
                    {"user"}
                  </p>
                </a>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="ml-auto flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium hover:dark:text-white"
                  type="submit"
                >
                  <HiOutlineArrowRightOnRectangle
                    className="h-4 w-4 stroke-2 text-text dark:text-text"
                    width="16px"
                    height="16px"
                    color="inherit"
                  />
                </Button>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
}

export default Sidebar;
