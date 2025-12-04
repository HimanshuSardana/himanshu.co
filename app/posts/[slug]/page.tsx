import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { Navbar } from "@/components/navbar";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { TableOfContents } from "@/components/table-of-contents";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm"; // 1. Import remark-gfm for Tables
import { CodeOutput } from "@/components/code-output";
import { Callout } from "@/components/callout"; // 2. Import Callout

const components = {
	h2: ({ children }: any) => {
		const id = slugify(children?.toString() || "");
		return (
			<h2
				id={id}
				className="text-2xl font-bold mt-10 mb-4 text-white scroll-mt-24"
			>
				{children}
			</h2>
		);
	},
	h3: ({ children }: any) => {
		const id = slugify(children?.toString() || "");
		return (
			<h3
				id={id}
				className="text-xl font-semibold mt-8 mb-3 text-neutral-200 scroll-mt-24"
			>
				{children}
			</h3>
		);
	},
	CodeOutput,
	Callout, // 3. Register Callout
};

function getHeadings(content: string) {
	const regex = /^(##|###) (.*$)/gm;
	const headings = [];
	let match;
	while ((match = regex.exec(content)) !== null) {
		headings.push({
			title: match[2],
			url: `#${slugify(match[2])}`,
			depth: match[1].length,
		});
	}
	return headings;
}

export async function generateStaticParams() {
	const slugs = getPostSlugs();
	return slugs.map((slug) => ({
		slug: slug,
	}));
}

function estimateReadingTime(text: string) {
	return Math.ceil(text.split(/\s+/).length / 200);
}

export default function PostPage({ params }: { params: { slug: string } }) {
	const { content, frontmatter } = getPostBySlug(params.slug);
	const headings = getHeadings(content);

	const options = {
		// theme: "github-dark-dimmed",
		theme: "one-dark-pro",
		keepBackground: false,
		onVisitHighlightedChars(node: any) {
			if (node.children?.[0]?.value === "SHIPMENT_ID") {
				node.properties["data-label"] = "Unique Identifier";
			}
		},
	};

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-neutral-800 selection:text-white relative">
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
			</div>

			<div className="container max-w-6xl mx-auto px-6 py-12 relative z-10">
				<Navbar />

				<div className="mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
					<aside className="hidden lg:block sticky top-32 h-fit">
						<TableOfContents headings={headings} />
					</aside>

					<article className="min-w-0">
						<Link
							href="/posts"
							className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 text-sm font-medium group"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							back to writing
						</Link>

						<header className="mb-12 border-b border-neutral-800 pb-8">
							<h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
								{frontmatter.title}
							</h1>

							<div className="flex flex-wrap items-center gap-6 text-sm font-mono text-neutral-500">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<time>
										{new Date(frontmatter.date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</time>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									<span>{estimateReadingTime(content)} min read</span>
								</div>
							</div>
						</header>

						{frontmatter.tldr && (
							<div className="mb-10 p-6 rounded-lg bg-neutral-900/50 border border-neutral-800/50">
								<span className="text-blue-400 font-bold font-mono text-xs uppercase tracking-wider block mb-2">
									TL;DR
								</span>
								<p className="text-neutral-300 italic leading-relaxed">
									{frontmatter.tldr}
								</p>
							</div>
						)}

						<div
							className="prose prose-invert prose-neutral max-w-none 
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-p:text-neutral-300 prose-p:leading-7 prose-p:text-lg
              prose-a:text-white prose-a:underline prose-a:decoration-neutral-600 prose-a:underline-offset-4 hover:prose-a:decoration-white prose-a:transition-all
              
              /* Custom Code Block Styling */
              prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-lg prose-pre:p-4
              prose-code:bg-neutral-900/50 prose-code:text-neutral-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-img:rounded-lg prose-img:border prose-img:border-neutral-800"
						>
							<MDXRemote
								source={content}
								components={components}
								options={{
									mdxOptions: {
										remarkPlugins: [remarkMath, remarkGfm], // 4. Added remarkGfm here
										rehypePlugins: [[rehypePrettyCode, options], rehypeKatex],
									},
								}}
							/>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}
