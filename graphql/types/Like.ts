import { objectType } from 'nexus';

export const Like = objectType({
  name: 'Like',
  definition(t) {
    t.int('id');
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
    t.string('authorEmail');
    t.field('post', {
      type: 'Post',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post.findUnique({
          where: { id: _parent.postId },
        });
        // .post(); 이게 있고 없고 차이를 모르겠다
      },
    });
    t.int('postId');
  },
});
