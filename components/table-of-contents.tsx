"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TocItem {
	title: string;
	url: string;
	depth: number; // 2 for h2, 3 for h3
}

export function TableOfContents({ headings }: { headings: TocItem[] }) {
	const [activeId, setActiveId] = useState<string>(
		headings[0]?.url.replace("#", "") || "",
	);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "0% 0% -80% 0%" }, // Trigger when element is near top
		);

		headings.forEach((heading) => {
			const element = document.getElementById(heading.url.replace("#", ""));
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [headings]);

	if (headings.length === 0) return null;

	useEffect(() => {
		console.log("Active TOC ID:", activeId);
	}, [activeId]);

	return (
		<nav className="hidden lg:block sticky top-32 h-fit w-64 pr-4">
			<h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 pl-4">
				On this page
			</h4>
			<ul className="flex flex-col gap-2 border-l border-neutral-800">
				{headings.map((heading) => (
					<li key={heading.url} className="relative">
						<a
							href={heading.url}
							onClick={(e) => {
								e.preventDefault();
								document.querySelector(heading.url)?.scrollIntoView({
									behavior: "smooth",
								});
								setActiveId(heading.url.replace("#", ""));
							}}
							className={cn(
								"block py-1 pl-4 text-sm transition-colors duration-200",
								heading.depth === 3 && "pl-8 text-xs",
								activeId === heading.url.replace("#", "")
									? "text-white font-medium"
									: "text-neutral-500 hover:text-neutral-300",
							)}
						>
							{heading.title}
						</a>

						{/* The Animated Left Border */}
						{activeId === heading.url.replace("#", "") && (
							<motion.div
								layoutId="active-toc-indicator"
								className="absolute left-0 top-0 bottom-0 w-[1px] bg-white -ml-[1px]"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							/>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
