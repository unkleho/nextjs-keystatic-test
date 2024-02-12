import Link from 'next/link';
import { reader } from '@/lib/reader';

export default async function Page() {
  const posts = await reader().collections.posts.all();

  return (
    <div className="app">
      <h1 className="mb-4 font-semibold text-2xl">Home</h1>

      <ul className="list-disc mb-8 pl-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
