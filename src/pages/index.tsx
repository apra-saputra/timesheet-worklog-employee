import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const Home = () => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) redirect("/admin/dashboard");
  }, [isSignedIn]);

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Suspense fallback="Loading...">
        <h1 className="text-6xl">Welcome</h1>
        <div className="min-w-[300px] flex justify-center items-center gap-4">
          {/* <Button type="button" onClick={() => router.push("/sign-in")}>
            Sign In
          </Button>
          <Button type="button" onClick={() => router.push("/sign-up")}>
            Sign Up
          </Button> */}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
