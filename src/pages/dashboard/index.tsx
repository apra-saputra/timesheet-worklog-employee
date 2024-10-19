import { Button } from "@/components/ui/button";
import React from "react";

const Dashboard = () => {
  return (
    <section className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-6xl">hello world</h1>
        <Button>Click me</Button>
      </div>
    </section>
  );
};

export default Dashboard;
