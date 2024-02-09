import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  console.log({ params });
  const post = await reader.collections.posts.read(params.slug);

  if (!post) {
    return null;
  }

  return (
    <>
      hello
      <h1>{post?.title}</h1>
      <DocumentRenderer document={await post.content()} />
    </>
  );
}