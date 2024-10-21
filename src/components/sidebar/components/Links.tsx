"use client";

import { IRoute } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const pathname = usePathname();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname]
  );

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, key) => {
      if (route.disabled) {
        return (
          <div
            key={key}
            className={`flex w-full max-w-full cursor-not-allowed items-center justify-between rounded-lg py-3 pl-8 font-medium mb-2`}
          >
            <div className="w-full items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <div
                  className={`text mr-3 mt-1.5 text-zinc-950 opacity-30 dark:text-white`}
                >
                  {route.icon}
                </div>
                <p
                  className={`mr-auto text-sm text-zinc-950 opacity-30 dark:text-white`}
                >
                  {route.name}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={key} className="mb-2">
            <div
              className={`flex w-full max-w-full items-center justify-between rounded-lg py-3 pl-8 hover:bg-primary/90 active:bg-primary/75 ${
                activeRoute(route.path.toLowerCase())
                  ? "font-semibold bg-primary text-text dark:bg-secondary dark:text-text"
                  : "font-medium text-text dark:text-text"
              }`}
            >
              <Link
                href={route.layout ? route.layout + route.path : route.path}
                key={key}
                className="w-full"
              >
                <div className="w-full items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <div
                      className={`text mr-3 mt-1.5 ${
                        activeRoute(route.path.toLowerCase())
                          ? "font-semibold text-text dark:text-text"
                          : "text-text dark:text-text"
                      } `}
                    >
                      {route.icon}
                    </div>
                    <p
                      className={`mr-auto text-sm ${
                        activeRoute(route.path.toLowerCase())
                          ? "font-semibold text-text dark:text-text"
                          : "font-medium text-text dark:text-text"
                      }`}
                    >
                      {route.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
