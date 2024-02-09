import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

import Link from 'next/link';

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const posts = await reader.collections.posts.all();

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
