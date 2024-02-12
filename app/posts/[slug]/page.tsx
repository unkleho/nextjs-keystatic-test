import { DocumentRenderer } from '@keystatic/core/renderer';
import Link from 'next/link';
import { reader } from '@/lib/reader';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await reader().collections.posts.read(params.slug);

  const authors = [];

  for (const authorSlug of post?.authors || []) {
    if (authorSlug) {
      const author = await reader().collections.authors.read(authorSlug);
      authors.push(author);
    }
  }

  if (!post) {
    return (
      <div className="app">
        <p>No post found</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1 className="mb-4 font-semibold text-2xl">{post.title}</h1>
      <DocumentRenderer document={await post.content()} />

      {post.authors?.length > 0 ? (
        <div className="mt-6">
          By{' '}
          {authors
            .map((author) => {
              return author?.title;
            })
            .join(', ')}
        </div>
      ) : null}

      <br />
      <Link href="/">Back home</Link>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader().collections.posts.list();

  return slugs.map((slug) => ({
    slug,
  }));
}
