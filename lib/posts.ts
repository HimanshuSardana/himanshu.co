import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "app/posts/(content)");

// --- Helper to get all slugs (for generateStaticParams) ---
export function getPostSlugs() {
	const files = fs.readdirSync(postsDirectory);
	return files.map((fileName) => {
		if (fileName.endsWith(".mdx")) {
			return fileName.replace(/\.mdx$/, "");
		}
		return fileName; // It's a folder
	});
}

// --- Get a specific post by slug ---
export function getPostBySlug(slug: string) {
	let fullPath = path.join(postsDirectory, `${slug}.mdx`);

	// Check if file exists, if not, check for folder/page.mdx
	if (!fs.existsSync(fullPath)) {
		fullPath = path.join(postsDirectory, slug, "page.mdx");
	}

	if (!fs.existsSync(fullPath)) {
		throw new Error(`Post not found for slug: ${slug}`);
	}

	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		slug,
		frontmatter: data,
		content,
	};
}

// --- Get all posts (for the list page) ---
export function getAllPosts() {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => {
			try {
				return getPostBySlug(slug);
			} catch (e) {
				return null;
			}
		})
		// Filter out nulls and sort by date
		.filter((post): post is NonNullable<typeof post> => post !== null)
		.sort((a, b) => {
			return (
				new Date(b.frontmatter.date).getTime() -
				new Date(a.frontmatter.date).getTime()
			);
		});

	return posts;
}
