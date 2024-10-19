import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-6xl">hello world</h1>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
