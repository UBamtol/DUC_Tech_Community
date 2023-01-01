import { typeFromAST } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod, nonNull, nullable, objectType, stringArg } from 'nexus';
import { resolve } from 'path';

export const GQLDate = asNexusMethod(DateTimeResolver, 'date');

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.date('createdAt');
    t.string('title');
    t.string('content');
    t.boolean('published');
    t.field('author', {
      type: 'User',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post
          .findUnique({
            where: { id: _parent.id },
          })
          .author();
      },
    });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
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
