import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import Link from 'next/link';
import { reader } from '@/lib/reader';

// const reader = createReader(process.cwd(), keystaticConfig);

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;

  try {
    // These work locally, but not on Vercel
    post = await reader().collections.posts.read(params.slug);
    const allPosts = await reader().collections.posts.all();
    const list = await reader().collections.posts.list();

    console.log({
      params,
      post,
      posts: reader().collections.posts,
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
          <h1 className="mb-4 font-semibold text-2xl">{post.title}</h1>
          <DocumentRenderer document={await post.content()} />
        </>
      )}

      <br />

      <p>
        (<code>post</code> works on local, but not on Vercel)
      </p>

      <br />
      <Link href="/">Back home</Link>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await reader().collections.posts.list();
  console.log(slugs);

  return slugs;

  // return slugs.map((slug) => ({
  //   slug: slug.split('/'),
  // }));
}
