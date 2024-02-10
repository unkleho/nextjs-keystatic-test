import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import Link from 'next/link';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await reader.collections.posts.read(params.slug);
  try {
    const allPosts = await reader.collections.posts.all();
    const list = await reader.collections.posts.list();
    const post2 = await reader.collections.posts.read(params.slug);
    console.log({
      params,
      post,
      post2,
      posts: reader.collections.posts,
      allPosts,
      list,
      cwd: process.cwd(),
      keystaticConfig,
    });
  } catch (e) {
    console.log('readOrThrow', e);
  }

  return (
    <>
      {post && (
        <>
          <h1>{post?.title}</h1>
          <DocumentRenderer document={await post.content()} />
        </>
      )}

      <br />
      <Link href="/">Back home</Link>
    </>
  );
}
