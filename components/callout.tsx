import { cn } from "@/lib/utils";
import { AlertTriangle, Info, AlertOctagon, CheckCircle2 } from "lucide-react";

interface CalloutProps {
	type?: "info" | "warning" | "alert" | "success";
	title?: string;
	children: React.ReactNode;
}

const icons = {
	info: Info,
	warning: AlertTriangle,
	alert: AlertOctagon,
	success: CheckCircle2,
};

const colorStyles = {
	info: "text-blue-400",
	warning: "text-amber-400",
	alert: "text-red-400",
	success: "text-emerald-400",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
	const Icon = icons[type];
	const colorClass = colorStyles[type];

	return (
		<div className="my-8 p-6 rounded-lg bg-neutral-900/50 border border-neutral-800/50">
			<div
				className={cn(
					"flex items-center gap-2 mb-3 font-bold font-mono text-xs uppercase tracking-wider",
					colorClass,
				)}
			>
				<Icon className="w-4 h-4" />
				<span>{title || type}</span>
			</div>
			<div className="text-neutral-300 font-mono leading-relaxed prose-p:my-0">
				{children}
			</div>
		</div>
	);
}
