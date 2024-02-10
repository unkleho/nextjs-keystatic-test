import { config, fields, collection } from '@keystatic/core';

const isProd = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV);

console.log('keystatic.config', process.env.NEXT_PUBLIC_VERCEL_ENV);

export default config({
  // storage: {
  //   kind: 'github',
  //   repo: {
  //     name: 'nextjs-keystatic-test',
  //     owner: 'unkleho',
  //   },
  // },
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          name: 'nextjs-keystatic-test',
          owner: 'unkleho',
        },
      }
    : { kind: 'local' },
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
