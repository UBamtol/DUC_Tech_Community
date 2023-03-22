import { GraphQLDateTime } from 'graphql-scalars';
import { asNexusMethod, nonNull, nullable, objectType, stringArg } from 'nexus';
import { resolve } from 'path';

export const GQLDate = asNexusMethod(GraphQLDateTime, 'date');

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.date('createdAt');
    t.string('title');
    t.string('content');
    t.string('category');
    t.string('subCategory');
    t.int('views');
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
    t.list.field('comments', {
      type: 'Comment',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.comment.findMany({
          where: { postId: _parent.id },
        });
        // .comments(); 이게 있고 없고 차이를 모르겠다
      },
    });
  },
});
