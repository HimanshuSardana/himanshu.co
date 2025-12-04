"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar"; // Assuming your navbar is here
import { motion } from "motion/react";
import { ArrowRight, Github, FileText } from "lucide-react";

export default function Home() {
	// Animation variants for cleaner code
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	return (
		<main className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-neutral-800 selection:text-white overflow-hidden relative">
			{/* Background Texture */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
			</div>

			<div className="container max-w-4xl mx-auto px-6 py-12 relative z-10">
				<Navbar />

				{/* HERO SECTION */}
				<motion.div
					className="mt-24 md:mt-32 flex flex-col gap-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Intro Text */}
					<div className="space-y-2">
						<motion.div variants={itemVariants} className="overflow-hidden">
							<h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
								'sup, i'm <span className="text-neutral-500">himanshu.</span>
							</h1>
						</motion.div>

						<motion.div variants={itemVariants}>
							<h2 className="text-xl md:text-2xl font-medium text-neutral-400 mt-4 leading-relaxed max-w-2xl">
								20 y/o linux enthusiast & software engineer.
								<br />
								building things that break (sometimes) at{" "}
								<span className="text-neutral-200 underline decoration-neutral-700 decoration-1 underline-offset-4 hover:decoration-neutral-400 transition-all cursor-pointer">
									Thapar University
								</span>
								.
							</h2>
						</motion.div>
					</div>

					{/* Divider */}
					<motion.hr
						variants={{
							hidden: { scaleX: 0, originX: 0, opacity: 0 },
							visible: {
								scaleX: 1,
								opacity: 1,
								transition: { duration: 0.8, ease: "circOut" },
							},
						}}
						className="border-neutral-800 my-4"
					/>

					{/* Links */}
					<motion.div
						variants={itemVariants}
						className="flex flex-wrap items-center gap-6 text-lg font-medium"
					>
						<Link
							href="#"
							className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300"
						>
							<FileText className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
							<span className="underline decoration-dashed decoration-1 underline-offset-4 decoration-neutral-700 group-hover:decoration-white">
								read my cv
							</span>
						</Link>

						<span className="text-neutral-800">/</span>

						<Link
							href="https://github.com/HimanshuSardana"
							target="_blank"
							className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300"
						>
							<Github className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
							<span className="underline decoration-dashed decoration-1 underline-offset-4 decoration-neutral-700 group-hover:decoration-white">
								github
							</span>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</main>
	);
}
