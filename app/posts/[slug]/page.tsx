import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { Navbar } from "@/components/navbar";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { content, frontmatter } = getPostBySlug(params.slug);

  return (
    <div className="container w-4xl mx-auto my-16">
      <Navbar active={"posts"} />
      <article className="prose prose-invert">
        <div className="flex flex-col">
          <h3 className="text-3xl">{frontmatter.title}</h3>
          <h3 className="text-neutral-500">{frontmatter.pubDate}</h3>
        </div>
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
