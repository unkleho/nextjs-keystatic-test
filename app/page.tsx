import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

import Link from 'next/link';
import { reader } from '@/lib/reader';

// 1. Create a reader
// const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const posts = await reader().collections.posts.all();

  return (
    <div>
      <h1 className="mb-4 font-semibold text-2xl">Home</h1>

      <h2 className="mb-4 font-semibold text-sm">
        Dynamic routes (using app/posts/[slug].tsx)
      </h2>
      <ul className="list-disc mb-8 pl-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>

      <h2 className="mb-4 font-semibold text-sm">
        Static routes (using app/posts/static-post.tsx)
      </h2>
      <ul className="list-disc pl-4">
        <li>
          <Link href="posts/static-post">Test 3</Link>
        </li>
      </ul>
    </div>
  );
}
