import { cn } from "@/lib/utils";

interface CodeOutputProps {
	children: React.ReactNode;
	className?: string;
}

export function CodeOutput({ children, className }: CodeOutputProps) {
	return (
		<div className={cn("code-output not-prose", className)}>
			<span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 select-none font-mono">
				Output
			</span>
			<div className="font-mono text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
				{children}
			</div>
		</div>
	);
}
