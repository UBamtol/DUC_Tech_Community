import { objectType } from 'nexus';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.int('id');
    t.string('createAt');
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
    t.string('authorEmail');
    t.string('content');
  },
});
