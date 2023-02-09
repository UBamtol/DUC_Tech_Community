import { GraphQLDate } from 'graphql-scalars';
import { asNexusMethod, nonNull, nullable, objectType, stringArg } from 'nexus';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.date('createdAt');
    t.string('title');
    t.string('content');
    t.string('category');
    // t.boolean('published');
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
