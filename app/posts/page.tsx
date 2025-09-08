import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Navbar } from "@/components/navbar";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container w-4xl mx-auto my-16">
      <Navbar />
      <div className="mt-16 prose prose-invert max-w-2xl mx-auto">
        <h1>All Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                {post.frontmatter.title || post.slug}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
