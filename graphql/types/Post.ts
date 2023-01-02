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

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      async resolve(_, { name, email }, ctx) {
        return await ctx.prisma.user.create({
          data: {
            name,
            email,
          },
        });
      },
    });
    t.nullable.field('deletePost', {
      type: 'Post',
      args: {
        postId: stringArg(),
      },
      async resolve(_, { postId }, ctx) {
        return await ctx.prisma.post.delete({
          where: {
            id: Number(postId),
          },
        });
      },
    });
    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
        authorEmail: nonNull(stringArg()),
      },
      async resolve(_, { title, content, authorEmail }, ctx) {
        return await ctx.prisma.post.create({
          data: {
            title,
            content,
            published: true,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });
  },
});
