import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import Link from 'next/link';
import { reader } from '@/lib/reader';

// const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  // Works locally and on Vercel
  const post = await reader().collections.posts.read('test-3');

  try {
    // Works locally and on Vercel
    const allPosts = await reader().collections.posts.all();
    const list = await reader().collections.posts.list();

    console.log({
      params,
      post,
      allPosts,
      list,
      cwd: process.cwd(),
      keystaticConfig,
      VERCEL_ENV: process.env.VERCEL_ENV,
    });
  } catch (e) {
    console.log('readOrThrow', e);
  }

  return (
    <>
      {post && (
        <>
          <h1 className="mb-4 font-semibold text-2xl">{post?.title}</h1>
          <DocumentRenderer document={await post.content()} />
        </>
      )}

      <br />

      <p>(static page works on local and Vercel)</p>
      <br />
      <Link href="/">Back home</Link>
    </>
  );
}
