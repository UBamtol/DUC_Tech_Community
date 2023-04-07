import { intArg, nonNull, nullable, objectType, stringArg } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('findAll', {
      type: 'Post',
      args: {
        searchWord: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        return await ctx.prisma.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: String(_args.searchWord),
                  mode: 'insensitive',
                },
              },
              {
                content: {
                  contains: String(_args.searchWord),
                  mode: 'insensitive',
                },
              },
              {
                author: {
                  name: {
                    contains: String(_args.searchWord),
                    mode: 'insensitive',
                  },
                },
              },
            ],
          },
        });
      },
    });

    t.field('post', {
      type: 'Post',
      args: {
        postId: nonNull(intArg()),
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

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        return await ctx.prisma.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: String(_args.searchString),
                  mode: 'insensitive',
                },
              },
              {
                content: {
                  contains: String(_args.searchString),
                  mode: 'insensitive',
                },
              },
            ],
            // { content: { contains: searchString }, mode: 'insensitive' },
          },
        });
      },
    });

    t.list.field('users', {
      type: 'User',
      async resolve(_, _args, ctx) {
        return await ctx.prisma.user.findMany();
      },
    });

    t.list.field('filterUser', {
      type: 'User',
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        return await ctx.prisma.user.findMany({
          where: {
            name: { contains: String(_args.name), mode: 'insensitive' },
          },
        });
      },
    });

    t.field('comment', {
      type: 'Comment',
      args: {
        commentId: nonNull(intArg()),
      },
      async resolve(_, _args, ctx) {
        return await ctx.prisma.comment.findUnique({
          where: {
            id: Number(_args.commentId),
          },
        });
      },
    });
  },
});
