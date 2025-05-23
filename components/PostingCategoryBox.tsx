import { useQuery } from '@apollo/client';
import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { gql } from 'apollo-server-micro';
import Link from 'next/link';
import React from 'react';

interface PropsType {
  category: string;
  queryPath: string;
  isFreeBoard: boolean;
}

const FilterPostingCategoryQuery = gql`
  query FilterPostingCategory($queryPath: String!) {
    filterPostingCategory(queryPath: $queryPath) {
      id
      title
      createdAt
      author {
        name
      }
      views
    }
  }
`;

const PostingCategoryBox = ({
  category,
  queryPath,
  isFreeBoard,
}: PropsType) => {
  const { loading, error, data } = useQuery(FilterPostingCategoryQuery, {
    variables: { queryPath },
    skip: queryPath === undefined,
  });

  return (
    <>
      {!loading && data !== undefined ? (
        <div className='flex flex-col w-full h-full'>
          <div className='w-full border-b-2 flex justify-between items-center p-5 font-semibold font-lg'>
            {category}
            <Link
              href={
                isFreeBoard === true
                  ? `/free-board/${queryPath}`
                  : `/allPosts/${queryPath}`
              }
              className='flex items-center text-xs text-[#959595] font-normal hover:cursor-pointer'
            >
              더보기
              <PlusSmallIcon width={15} height={15} />
            </Link>
          </div>

          <ul className='list-inside list-disc px-2 py-2 text-xs'>
            {data.filterPostingCategory.length > 0 ? (
              data.filterPostingCategory.map((v: any, i: number) => {
                return (
                  <Link
                    href={`/posts/${v.id}`}
                    key={i}
                    className='flex justify-between items-center'
                  >
                    <li className='truncate my-2'>{v.title}</li>
                    <div className='flex gap-1 text-[#959595] '>
                      <div className='w-[80px]'>{v.author.name}</div>
                      <div className='w-[75px]'>
                        {v.createdAt.replaceAll('-', '.').slice(0, 10)}
                      </div>
                      <div className='w-[50px] flex justify-center'>
                        {v.views}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className='list-none px-2 py-2 text-xs font-semibold text-[#959595]'>
                <li className='py-2'>아직 작성된 게시글이 없습니다.</li>
              </div>
            )}
          </ul>
          <div></div>
        </div>
      ) : null}
    </>
  );
};

export default PostingCategoryBox;
