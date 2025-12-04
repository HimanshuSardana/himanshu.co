"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem={false}
			disableTransitionOnChange
			storageKey="theme" // default — you can change if you want to avoid existing saved value
		>
			{children}
		</ThemeProvider>
	);
}
