import Image from "next/image";
import { Rss, Sun } from "lucide-react";

function Navbar() {
  return (
    <div className="flex justify-between items-center">
      {/*  LINKS */}
      <div className="flex links gap-8">
        <h3 className="text-2xl font-semibold lowercase">me</h3>
        <h3 className="text-2xl text-neutral-600 lowercase">posts</h3>
        <h3 className="text-2xl text-neutral-600 lowercase">projects</h3>
      </div>

      {/* Secondary Links */}
      <div className="flex secondary-links gap-8 items-center">
        <Rss className="w-6 h-6 text-neutral-600 hover:text-neutral-200 cursor-pointer" />
        <Sun className="w-6 h-6 text-neutral-600 hover:text-neutral-200 cursor-pointer" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="container w-4xl mx-auto my-16">
      <Navbar />

      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center mt-16 gap-8">
        <div className="w-5/6 leading-tight">
          <h1 className="text-8xl font-bold inline">'sup</h1>
          <h1 className="text-8xl font-bold inline text-neutral-600">
            , i'm himanshu sardana
          </h1>

          <p className="text-2xl font-medium text-neutral-400 mt-5">
            Currently studying Computer Science at{" "}
            <span className="underline dotted">Thapar University</span>
          </p>
        </div>
      </div>
    </div>
  );
}
