import Image from "next/image";
import { Navbar } from "@/components/navbar";

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
          <p className="text-2xl font-medium text-neutral-400 mt-5 lowercase leading-normal">
            20 y/o linux enthusiast (I use arch btw). Currently studying
            Computer Science at{" "}
            <span className="underline decoration-dashed decoration-1">
              Thapar University
            </span>
          </p>

          <div className="border-b-2 border-neutral-800 mt-8"></div>

          <div className="flex gap-5 items-center text-2xl font-medium">
            <a
              href="#"
              className="text-2xl font-medium text-neutral-400 mt-5 lowercase underline decoration-dashed decoration-1 hover:text-neutral-200"
            >
              have a look at my resume
            </a>{" "}
            <span className="font-thin mt-5">|</span>{" "}
            <a
              href="https://github.com/HimanshuSardana"
              className="text-2xl font-medium text-neutral-400 mt-5 lowercase underline decoration-dashed decoration-1 hover:text-neutral-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
