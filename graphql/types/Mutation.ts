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
        subCategory: nonNull(stringArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
        authorEmail: nonNull(stringArg()),
      },
      async resolve(
        _,
        { category, subCategory, title, content, authorEmail },
        ctx
      ) {
        return await ctx.prisma.post.create({
          data: {
            category,
            subCategory,
            title,
            content,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });

    t.field('updatePost', {
      type: 'Post',
      args: {
        postId: nonNull(intArg()),
        content: nonNull(stringArg()),
      },
      async resolve(_, { postId, content }, ctx) {
        return await ctx.prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            content,
          },
        });
      },
    });

    t.field('deletePost', {
      type: 'Post',
      args: {
        postId: nonNull(intArg()),
      },
      async resolve(_, { postId }, ctx) {
        return await ctx.prisma.post.delete({
          where: {
            id: Number(postId),
          },
        });
      },
    });

    t.field('createComment', {
      type: 'Comment',
      args: {
        postId: nonNull(intArg()),
        content: nonNull(stringArg()),
        authorEmail: nonNull(stringArg()),
      },
      async resolve(_, { postId, content, authorEmail }, ctx) {
        return await ctx.prisma.comment.create({
          data: {
            postId,
            content,
            authorEmail,
          },
        });
      },
    });

    t.field('deleteComment', {
      type: 'Comment',
      args: {
        commentId: nonNull(intArg()),
      },
      async resolve(_, { commentId }, ctx) {
        return await ctx.prisma.comment.delete({
          where: {
            id: Number(commentId),
          },
        });
      },
    });
  },
});
