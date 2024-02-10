import { config, fields, collection } from '@keystatic/core';

const isLocal = !Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV);

export default config({
  storage: isLocal
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          name: 'nextjs-keystatic-test',
          owner: 'unkleho',
        },
      },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
