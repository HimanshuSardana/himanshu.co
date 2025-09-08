import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "app/posts/(content)");

export function getPostSlugs() {
  return fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);

  return {
    slug: realSlug,
    frontmatter: data,
    content,
  };
}

export function getAllPosts() {
  return getPostSlugs().map((slug) => getPostBySlug(slug));
}
