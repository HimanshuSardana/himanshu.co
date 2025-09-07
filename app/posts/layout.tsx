export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="prose prose-invert max-w-2xl mx-auto p-6">{children}</div>
  );
}
