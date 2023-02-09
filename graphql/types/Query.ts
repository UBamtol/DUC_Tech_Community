import { nonNull, nullable, objectType, stringArg } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('findAll', {
      type: 'Post',
      args: {
        word: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        return await ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: String(_args.word) } },
              { content: { contains: String(_args.word) } },
              { author: { name: { contains: String(_args.word) } } },
            ],
          },
        });
      },
    });
    t.field('post', {
      type: 'Post',
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        return await ctx.prisma.post.findUnique({
          where: { id: Number(_args.postId) },
        });
      },
    });
    t.list.field('posts', {
      type: 'Post',
      async resolve(_, _args, ctx) {
        return await ctx.prisma.post.findMany();
      },
    });
    t.list.field('user', {
      type: 'User',
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        return await ctx.prisma.user.findMany({
          where: { name: { contains: String(_args.name) } },
        });
      },
    });
    t.list.field('users', {
      type: 'User',
      async resolve(_, _args, ctx) {
        return await ctx.prisma.user.findMany();
      },
    });
    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: nullable(stringArg()),
      },
      async resolve(_, searchString, ctx) {
        return await ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        });
      },
    });
  },
});
