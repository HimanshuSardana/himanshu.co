"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, Sun } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "me" },
    { href: "/posts", label: "posts" },
    { href: "/projects", label: "projects" },
    { href: "/bookshelf", label: "bookshelf" },
  ];

  return (
    <div className="flex justify-between items-center transition">
      {/* Links */}
      <div className="flex gap-8">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/" // special case for home
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-semibold lowercase transition cursor-pointer
                ${isActive ? "text-neutral-200 underline underline-offset-4" : "text-neutral-600 hover:text-neutral-200 hover:underline underline-offset-4"}
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Secondary Links */}
      <div className="flex gap-8 items-center">
        <Rss className="w-6 h-6 text-neutral-600 hover:text-neutral-200 cursor-pointer transition" />
        <Sun className="w-6 h-6 text-neutral-600 hover:text-neutral-200 cursor-pointer transition" />
      </div>
    </div>
  );
}
