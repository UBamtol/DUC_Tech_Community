import { arg, intArg, nonNull, nullable, objectType, stringArg } from 'nexus';
import { Post } from './Post';
import { Like } from './Like';

export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.field('node', {
      type: Post,
    });
    t.int('likeCount');
  },
});

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.boolean('hasNextPage');
    t.int('totalPageCount');
  },
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo });
    t.list.field('edges', {
      type: Edge,
    });
  },
});

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

    t.field('posts', {
      type: 'Response',
      args: {
        pageNumber: nonNull(intArg()),
        sorting: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;
        let likeResults = await ctx.prisma.like.findMany();
        const totalPageCountResults = await ctx.prisma.post.findMany();

        if (args.sorting === 'latest') {
          if (args.pageNumber > 0) {
            queryResults = await ctx.prisma.post.findMany({
              skip: args.pageNumber * 10,
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          } else {
            queryResults = await ctx.prisma.post.findMany({
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          }

          if (queryResults.length > 0) {
            const secondQueryResults = await ctx.prisma.post.findMany({
              take: 10,
              skip: (args.pageNumber + 1) * 10,
              orderBy: {
                createdAt: 'desc',
              },
            });

            const result = {
              pageInfo: {
                hasNextPage: secondQueryResults.length !== 0,
                totalPageCount: Math.ceil(totalPageCountResults.length / 10),
              },
              edges: queryResults.map((post: any) => ({
                cursor: post.id,
                node: post,
                likeCount: likeResults.filter((e: any) => e.postId === post.id)
                  .length,
              })),
            };
            return result;
          }
        } else if (args.sorting === 'popular') {
          if (args.pageNumber > 0) {
            queryResults = await ctx.prisma.post.findMany({
              skip: args.pageNumber * 10,
              take: 10,
              orderBy: {
                views: 'desc',
              },
            });
          } else {
            queryResults = await ctx.prisma.post.findMany({
              take: 10,
              orderBy: {
                views: 'desc',
              },
            });
          }

          if (queryResults.length > 0) {
            const secondQueryResults = await ctx.prisma.post.findMany({
              take: 10,
              skip: (args.pageNumber + 1) * 10,
              orderBy: {
                views: 'desc',
              },
            });

            const result = {
              pageInfo: {
                hasNextPage: secondQueryResults.length !== 0,
                totalPageCount: Math.ceil(totalPageCountResults.length / 10),
              },
              edges: queryResults.map((post: any) => ({
                cursor: post.id,
                node: post,
                likeCount: likeResults.filter((e: any) => e.postId === post.id)
                  .length,
              })),
            };
            return result;
          }
        } else if (args.sorting === undefined) {
          if (args.pageNumber > 0) {
            queryResults = await ctx.prisma.post.findMany({
              skip: args.pageNumber * 10,
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          } else {
            queryResults = await ctx.prisma.post.findMany({
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          }

          if (queryResults.length > 0) {
            const secondQueryResults = await ctx.prisma.post.findMany({
              take: 10,
              skip: (args.pageNumber + 1) * 10,
              orderBy: {
                createdAt: 'desc',
              },
            });

            const result = {
              pageInfo: {
                hasNextPage: secondQueryResults.length !== 0,
                totalPageCount: Math.ceil(totalPageCountResults.length / 10),
              },
              edges: queryResults.map((post: any) => ({
                cursor: post.id,
                node: post,
                likeCount: likeResults.filter((e: any) => e.postId === post.id)
                  .length,
              })),
            };
            return result;
          }
        }

        return {
          edges: [],
          pageInfo: {
            hasNextPage: false,
          },
        };
      },
    });

    t.field('filterPosts', {
      type: 'Response',
      args: {
        pageNumber: nonNull(intArg()),
        searchString: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        let queryResults = null;
        let likeResults = await ctx.prisma.like.findMany();
        const totalPageCountResults = await ctx.prisma.post.findMany({
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
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (_args.pageNumber > 0) {
          queryResults = await ctx.prisma.post.findMany({
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
            },
            orderBy: {
              createdAt: 'desc',
            },
            skip: _args.pageNumber * 10,
            take: 10,
          });
        } else {
          queryResults = await ctx.prisma.post.findMany({
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
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 10,
          });
        }

        if (queryResults.length > 0) {
          const secondQueryResults = await ctx.prisma.post.findMany({
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
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 10,
            skip: (_args.pageNumber + 1) * 10,
          });

          const result = {
            pageInfo: {
              hasNextPage: secondQueryResults.length !== 0,
              totalPageCount: Math.ceil(totalPageCountResults.length / 10),
            },
            edges: queryResults.map((post: any) => ({
              cursor: post.id,
              node: post,
              likeCount: likeResults.filter((e: any) => e.postId === post.id)
                .length,
            })),
          };
          return result;
        }

        return {
          edges: [],
          pageInfo: {
            hasNextPage: false,
          },
        };
      },
    });

    t.list.field('filterPostingCategory', {
      type: 'Post',
      args: {
        queryPath: nonNull(stringArg()),
      },
      async resolve(_, _args, ctx) {
        let queryResults = null;
        if (_args.queryPath === 'latest') {
          queryResults = await ctx.prisma.post.findMany({
            take: 10,
            orderBy: {
              createdAt: 'desc',
            },
          });
        } else if (_args.queryPath === 'popular') {
          queryResults = await ctx.prisma.post.findMany({
            take: 10,
            orderBy: {
              views: 'desc',
            },
          });
        } else {
          queryResults = await ctx.prisma.post.findMany({
            take: 10,
            where: {
              subCategory: _args.queryPath,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        }
        return queryResults;
      },
    });

    t.field('filterCategory', {
      type: 'Response',
      args: {
        mainCategory: nonNull(stringArg()),
        searchCategory: nonNull(stringArg()),
        pageNumber: nonNull(intArg()),
      },
      async resolve(_, _args, ctx) {
        let queryResults = null;
        let likeResults = await ctx.prisma.like.findMany();
        if (_args.searchCategory === 'allPosts') {
          const totalPageCountResults = await ctx.prisma.post.findMany({
            where: {
              category: String(_args.mainCategory),
            },
          });

          if (_args.pageNumber > 0) {
            queryResults = await ctx.prisma.post.findMany({
              where: {
                category: String(_args.mainCategory),
              },
              skip: _args.pageNumber * 10,
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          } else {
            queryResults = await ctx.prisma.post.findMany({
              where: {
                category: String(_args.mainCategory),
              },
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          }

          if (queryResults.length > 0) {
            const secondQueryResults = await ctx.prisma.post.findMany({
              where: {
                category: String(_args.mainCategory),
              },
              take: 10,
              skip: (_args.pageNumber + 1) * 10,
              orderBy: {
                createdAt: 'desc',
              },
            });

            const result = {
              pageInfo: {
                hasNextPage: secondQueryResults.length !== 0,
                totalPageCount: Math.ceil(totalPageCountResults.length / 10),
              },
              edges: queryResults.map((post: any) => ({
                cursor: post.id,
                node: post,
                likeCount: likeResults.filter((e: any) => e.postId === post.id)
                  .length,
              })),
            };
            return result;
          }

          return {
            edges: [],
            pageInfo: {
              hasNextPage: false,
            },
          };
        } else {
          const totalPageCountResults = await ctx.prisma.post.findMany({
            where: {
              subCategory: {
                contains: String(_args.searchCategory),
                mode: 'insensitive',
              },
            },
          });

          if (_args.pageNumber > 0) {
            queryResults = await ctx.prisma.post.findMany({
              where: {
                subCategory: {
                  contains: String(_args.searchCategory),
                  mode: 'insensitive',
                },
              },
              skip: _args.pageNumber * 10,
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          } else {
            queryResults = await ctx.prisma.post.findMany({
              where: {
                subCategory: {
                  contains: String(_args.searchCategory),
                  mode: 'insensitive',
                },
              },
              take: 10,
              orderBy: {
                createdAt: 'desc',
              },
            });
          }

          if (queryResults.length > 0) {
            const secondQueryResults = await ctx.prisma.post.findMany({
              where: {
                subCategory: {
                  contains: String(_args.searchCategory),
                  mode: 'insensitive',
                },
              },
              take: 10,
              skip: (_args.pageNumber + 1) * 10,
              orderBy: {
                createdAt: 'desc',
              },
            });

            const result = {
              pageInfo: {
                hasNextPage: secondQueryResults.length !== 0,
                totalPageCount: Math.ceil(totalPageCountResults.length / 10),
              },
              edges: queryResults.map((post: any) => ({
                cursor: post.id,
                node: post,
                likeCount: likeResults.filter((e: any) => e.postId === post.id)
                  .length,
              })),
            };

            return result;
          }

          return {
            edges: [],
            pageInfo: {
              hasNextPage: false,
            },
          };
        }
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

    t.field('notice', {
      type: 'Notice',
      async resolve(_, _args, ctx) {
        return await ctx.prisma.notice.findFirst({
          orderBy: {
            content: 'asc',
          },
        });
      },
    });
  },
});
