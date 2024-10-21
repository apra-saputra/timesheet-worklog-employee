import React, { Suspense, useState } from "react";
import Navbar from "../navbar/NavbarAdmin";
import Sidebar from "../sidebar/Sidebar";
import { routes } from "../routes";
import { IRoute } from "@/types/types";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const getActiveRoute = (routes: IRoute[], pathname: string): string => {
    const findCurrentRoute = (
      routes: IRoute[],
      pathname: string
    ): IRoute | undefined => {
      for (let route of routes) {
        if (route.items) {
          const found = findCurrentRoute(route.items, pathname);
          if (found) return found;
        }
        if (pathname?.match(route.path) && route) {
          return route;
        }
      }
    };

    const route = findCurrentRoute(routes, pathname);
    return route?.name || "Default Brand Text";
  };

  return (
    <>
      <Sidebar routes={routes} setOpen={setOpen} />
      <div className="h-full w-full dark:bg-background">
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-background md:pr-2 xl:ml-[328px] min-h-screen`}
        >
          <Toaster />
          <Navbar brandText={getActiveRoute(routes, pathname)} />
          <Suspense fallback={"Loading..."}>
            <div className="mx-auto min-h-screen p-2 !pt-[100px] md:p-2 md:!pt-[155px]">
              {children}
            </div>
          </Suspense>
          {/* {children} */}
          <div className="p-3">{/* <Footer /> */}</div>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
