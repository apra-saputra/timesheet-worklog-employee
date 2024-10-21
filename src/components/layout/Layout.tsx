import React from "react";
import { Toaster } from "../ui/toaster";
import Head from "next/head";
import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";
import { useAuth } from "@clerk/nextjs";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const capitalize = (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const { userId } = useAuth();

  const handleTitle = () => {
    return !!userId
      ? capitalize(pathname.replaceAll("/", " | "))
      : "Admin Worksheet";
  };

  return (
    <>
      <Head>
        <title>{handleTitle()}</title>
        <meta name="description" content={pathname} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {!!userId ? (
        <>
          <Toaster />
          <MainLayout>{children}</MainLayout>
        </>
      ) : (
        <div className="h-full w-full bg-background dark:bg-background mx-auto">
          <main
            className={`w-full min-h-screen flex-none transition-all overflow-x-hidden`}
          >
            <Toaster />
            {children}
          </main>
        </div>
      )} */}
      <>
          <Toaster />
          <MainLayout>{children}</MainLayout>
        </>
    </>
  );
};

export default Layout;
