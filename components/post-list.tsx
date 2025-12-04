// components/post-list.tsx
"use client";

import Link from "next/link";
import { formatRelativeDate } from "@/lib/date";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

// Define the shape of the data we expect
type Post = {
	slug: string;
	frontmatter: { title?: string; date?: string;[key: string]: any };
};

export function PostList({ posts }: { posts: Post[] }) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	};

	return (
		<motion.ul
			className="flex flex-col gap-2"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{posts.map((post) => (
				<motion.li key={post.slug} variants={itemVariants}>
					<Link
						href={`/posts/${post.slug}`}
						className="group flex items-end justify-between gap-4 py-3 cursor-pointer"
					>
						<div className="flex items-center gap-3">
							<span className="text-xl font-medium text-neutral-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 ease-out">
								{post.frontmatter.title || post.slug}
							</span>
						</div>

						{/* Dotted Leader Line */}
						<div className="hidden md:block flex-grow border-b border-neutral-800 border-dotted mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

						<div className="flex items-center gap-4 text-neutral-600 font-mono text-sm whitespace-nowrap group-hover:text-neutral-400 transition-colors">
							<span>{formatRelativeDate(post.frontmatter.date)}</span>
							<ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
						</div>
					</Link>
				</motion.li>
			))}
		</motion.ul>
	);
}
