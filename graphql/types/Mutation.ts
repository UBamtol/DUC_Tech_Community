import { intArg, nonNull, nullable, objectType, stringArg } from 'nexus';

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    // t.field('signupUser', {
    //   type: 'User',
    //   args: {
    //     name: stringArg(),
    //     email: nonNull(stringArg()),
    //   },
    //   async resolve(_, { name, email }, ctx) {
    //     return await ctx.prisma.user.create({
    //       data: {
    //         name,
    //         email,
    //       },
    //     });
    //   },
    // });
    // t.field('createPost', {
    //   type: 'Post',
    //   args: {
    //     title: nonNull(stringArg()),
    //     content: nonNull(stringArg()),
    //     authorEmail: nonNull(stringArg()),
    //   },
    //   async resolve(_, { title, content, authorEmail }, ctx) {
    //     return await ctx.prisma.post.create({
    //       data: {
    //         title,
    //         content,
    //         author: {
    //           connect: { email: authorEmail },
    //         },
    //       },
    //     });
    //   },
    // });
    t.field('createPost', {
      type: 'Post',
      args: {
        category: nonNull(stringArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
        authorEmail: nonNull(stringArg()),
      },
      async resolve(_, { category, title, content, authorEmail }, ctx) {
        return await ctx.prisma.post.create({
          data: {
            category,
            title,
            content,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });
    t.nullable.field('deletePost', {
      type: 'Post',
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_, { postId }, ctx) {
        return await ctx.prisma.post.delete({
          where: {
            id: Number(postId),
          },
        });
      },
    });
  },
});
