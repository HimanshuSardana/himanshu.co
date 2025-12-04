// app/posts/page.tsx
import { getAllPosts } from "@/lib/posts";
import { Navbar } from "@/components/navbar";
import { PostList } from "@/components/post-list";

export const metadata = {
	title: "Writing | Himanshu Sardana",
	description: "Thoughts on software, linux, and design.",
};

export default function PostsPage() {
	// This runs on the server, so 'fs' is allowed here
	const posts = getAllPosts();

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-neutral-800 selection:text-white">
			{/* Background Grid Pattern (Optional) */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
			</div>

			<div className="container max-w-4xl mx-auto px-6 py-12 relative z-10">
				<Navbar />

				<div className="mt-24 md:mt-32">
					{/* Header */}
					<div className="flex items-baseline gap-3 mb-12 border-b border-neutral-800 pb-4">
						<h1 className="text-4xl font-bold tracking-tight text-white">
							writing
						</h1>
						<span className="text-neutral-500 font-mono text-sm">
							({posts.length} posts)
						</span>
					</div>

					{/* Client Component for the list */}
					<PostList posts={posts} />
				</div>
			</div>
		</div>
	);
}
