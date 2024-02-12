import Link from 'next/link';
import { reader } from '@/lib/reader';

export default async function Page() {
  const posts = await reader().collections.posts.all();

  return (
    <div className="app">
      <h1 className="mb-4 font-semibold text-2xl">
        Next JS + Keystatic example
      </h1>

      <p className="mb-4">
        With Github integration and draft mode. Edit content{' '}
        <Link href={'/keystatic'}>here</Link>.
      </p>

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
