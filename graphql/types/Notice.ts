import { objectType } from 'nexus';

export const Notice = objectType({
  name: 'Notice',
  definition(t) {
    t.int('id'), t.string('createdAt'), t.string('content');
  },
});
