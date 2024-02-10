import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import Link from 'next/link';
import { asyncComponent } from '@/lib/async-component';

const reader = createReader('', keystaticConfig);

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // const post = await reader.collections.posts.read(params.slug);
  // try {
  //   const allPosts = await reader.collections.posts.all();
  //   const list = await reader.collections.posts.list();
  //   const post2 = await reader.collections.posts.read(params.slug);
  //   console.log({
  //     params,
  //     post,
  //     post2,
  //     posts: reader.collections.posts,
  //     allPosts,
  //     list,
  //     cwd: process.cwd(),
  //     keystaticConfig,
  //   });
  // } catch (e) {
  //   console.log('readOrThrow', e);
  // }

  return (
    <>
      <Post slug={params.slug} />

      <br />
      <Link href="/">Back home</Link>
    </>
  );
}

const Post = asyncComponent(async function EventTalks(props: { slug: string }) {
  const post = await reader.collections.posts.readOrThrow(props.slug, {
    resolveLinkedFiles: true,
  });

  return (
    <div className="mx-auto mt-8 max-w-5xl px-6">
      <h2 className="mt-20 text-4xl font-bold">{post.title}</h2>
      {/* <DocumentRenderer document={await post.content()} /> */}
    </div>
  );
});
