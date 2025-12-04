import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word chars
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function rehypeAnnotate() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "pre") return;

			const codeEl = node.children?.[0];
			if (!codeEl || codeEl.tagName !== "code") return;

			const meta = codeEl.data?.meta;
			if (!meta) return;

			// Matches annotate="<stuff>"
			const match = meta.match(/annotate="([^"]*)"/);
			if (!match) return;

			const annotationString = match[1];

			const annotations = annotationString.split(",").map((item) => {
				const [line, text] = item.split(":");
				return {
					line: Number(line),
					text: text.trim(),
				};
			});

			// Attach parsed annotations to output
			codeEl.data.annotations = annotations;
		});
	};
}

function visit(node, type, callback) {
	if (!node || typeof node !== "object") return;
	if (node.type === type) callback(node);
	if (node.children)
		node.children.forEach((child) => visit(child, type, callback));
}
