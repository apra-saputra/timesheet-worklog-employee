import React, { useState } from "react";
import Navbar from "./navbar/NavbarAdmin";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "./sidebar/Sidebar";
import { routes } from "./routes";
import { IRoute } from "@/types/types";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  // const pathname = router.pathname.split("/");
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
      <Head>
        <title>
          ADMIN {pathname[1] ? "| " + pathname[1].toUpperCase() : null}
        </title>
        <meta name="description" content={pathname[1]} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <>
        <Sidebar routes={routes} setOpen={setOpen} />
        <div className="h-full w-full dark:bg-background">
          <main
            className={`mx-2.5 flex-none transition-all dark:bg-background md:pr-2 xl:ml-[328px] min-h-screen`}
          >
            <Toaster />
            <Navbar brandText={getActiveRoute(routes, pathname)} />
            <div className="mx-auto min-h-screen p-2 !pt-[90px] md:p-2 md:!pt-[118px]">
                  {children}
                </div>
            {/* {children} */}
            <div className="p-3">{/* <Footer /> */}</div>
          </main>
        </div>
      </>
    </>
  );
};

export default MainLayout;
