import { config, fields, collection } from '@keystatic/core';

const isProd = Boolean(process.env.VERCEL_ENV);

console.log('keystatic.config', process.env.VERCEL_ENV);

export default config({
  storage: {
    kind: 'github',
    repo: {
      name: 'nextjs-keystatic-test',
      owner: 'unkleho',
    },
  },
  // storage: isProd
  //   ? {
  //       kind: 'github',
  //       repo: {
  //         name: 'nextjs-keystatic-test',
  //         owner: 'unkleho',
  //       },
  //     }
  //   : { kind: 'local' },
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
