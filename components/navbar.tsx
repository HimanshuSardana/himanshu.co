"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";

export function Navbar() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();

	// Ensure we only render the portal/theme toggle on the client side
	useEffect(() => {
		setMounted(true);
		console.log("Navbar mounted. Initial theme:", theme);
	}, []);

	// LOGGING: Watch for theme changes
	useEffect(() => {
		if (mounted) {
			console.log(
				"🎨 Theme changed. State:",
				theme,
				"| Resolved:",
				resolvedTheme,
			);
			const htmlClass = document.documentElement.className;
			console.log("<html> classes:", htmlClass);
		}
	}, [theme, resolvedTheme, mounted]);

	// Lock body scroll when menu is open
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [menuOpen]);

	const links = [
		{ href: "/", label: "me" },
		{ href: "/posts", label: "writing" },
		{ href: "/projects", label: "projects" },
		{ href: "/bookshelf", label: "bookshelf" },
	];

	const toggleTheme = () => {
		console.log("🔘 Toggle clicked. Current:", theme);
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
	};

	return (
		<>
			<nav className="sticky top-0 z-40 -mx-6 px-6 py-4 backdrop-blur-xl bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-white/5 transition-all mb-12">
				<div className="flex justify-between items-center max-w-4xl mx-auto">
					{/* Desktop Links */}
					<div className="hidden md:flex gap-8">
						{links.map((link) => {
							const isActive =
								link.href === "/"
									? pathname === "/"
									: pathname.startsWith(link.href);

							return (
								<Link
									key={link.href}
									href={link.href}
									className="relative group"
								>
									<span
										className={`relative z-10 text-lg font-medium lowercase transition-colors duration-200 ${isActive
												? "text-black dark:text-white"
												: "text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
											}`}
									>
										{link.label}
									</span>

									{/* Active Indicator (Underline) */}
									{isActive && (
										<motion.span
											layoutId="navbar-indicator"
											className="absolute left-0 right-0 -bottom-1 h-px bg-black dark:bg-white"
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
										/>
									)}
								</Link>
							);
						})}
					</div>

					{/* Right Side - Icons & Mobile Toggle */}
					<div className="flex items-center gap-6 ml-auto">
						{/* Theme Toggle / RSS */}
						<div className="flex items-center gap-4 border-l border-neutral-200 dark:border-neutral-800 pl-6">
							<motion.a
								href="/rss.xml"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className="text-neutral-500 hover:text-orange-400 transition-colors"
							>
								<Rss className="w-5 h-5" />
							</motion.a>

							{mounted ? (
								<motion.button
									onClick={toggleTheme}
									whileHover={{ rotate: 15 }}
									whileTap={{ rotate: -15 }}
									className="text-neutral-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
									aria-label="Toggle theme"
								>
									{/* Show Sun in Dark mode (to switch to light), Moon in Light mode */}
									{resolvedTheme === "dark" ? (
										<Sun className="w-5 h-5" />
									) : (
										<Moon className="w-5 h-5" />
									)}
								</motion.button>
							) : (
								<div className="w-5 h-5" /> /* Placeholder */
							)}
						</div>

						{/* Mobile Hamburger */}
						<button
							className="md:hidden text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
							onClick={() => setMenuOpen(true)}
						>
							<Menu className="w-6 h-6" />
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{mounted &&
				createPortal(
					<AnimatePresence>
						{menuOpen && (
							<>
								{/* Backdrop */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => setMenuOpen(false)}
									className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] md:hidden"
								/>

								{/* Slide-in Panel */}
								<motion.div
									initial={{ x: "100%" }}
									animate={{ x: 0 }}
									exit={{ x: "100%" }}
									transition={{
										type: "spring",
										damping: 25,
										stiffness: 200,
									}}
									className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl z-[1000] md:hidden flex flex-col p-6"
								>
									<div className="flex justify-between items-center mb-8">
										{/* Mobile Theme Toggle */}
										<button
											onClick={toggleTheme}
											className="text-neutral-500 hover:text-yellow-500"
										>
											{resolvedTheme === "dark" ? (
												<Sun className="w-6 h-6" />
											) : (
												<Moon className="w-6 h-6" />
											)}
										</button>

										<button
											onClick={() => setMenuOpen(false)}
											className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
										>
											<X className="w-6 h-6" />
										</button>
									</div>

									<div className="flex flex-col gap-6">
										{links.map((link, i) => (
											<motion.div
												key={link.href}
												initial={{ opacity: 0, x: 20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: i * 0.1 }}
											>
												<Link
													href={link.href}
													onClick={() => setMenuOpen(false)}
													className={`text-2xl font-semibold lowercase ${pathname === link.href ||
															(link.href !== "/" &&
																pathname.startsWith(link.href))
															? "text-black dark:text-white"
															: "text-neutral-500"
														}`}
												>
													{link.label}
												</Link>
											</motion.div>
										))}
									</div>
								</motion.div>
							</>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
}
