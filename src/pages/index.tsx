import Image from "next/image";
import localFont from "next/font/local";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-6xl">hello world</h1>
        <Button>Click me</Button>
      </div>
    </section>
  );
}
