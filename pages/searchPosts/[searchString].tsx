import { useQuery } from '@apollo/client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { gql } from 'apollo-server-micro';
import LeftCategoryBox from 'components/LeftCategoryBox';
import { clear } from 'console';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const FilterPostsQuery = gql`
  query FilterPosts($searchString: String!, $pageNumber: Int!) {
    filterPosts(searchString: $searchString, pageNumber: $pageNumber) {
      pageInfo {
        hasNextPage
        totalPageCount
      }
      edges {
        node {
          id
          createdAt
          title
          subCategory
          views
          author {
            name
          }
        }
        likeCount
      }
    }
  }
`;

const searchString = () => {
  const highlightedText = (text: string, query: string) => {
    if (text.toLowerCase().includes(query.toLowerCase())) {
      const parts = text.split(new RegExp(`(${query})`, 'gi'));

      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <span className='font-bold text-[#4DB5D9]' key={i}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      );
    }

    return text;
  };
  const router = useRouter();
  const searchWord = router.query.searchString;
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, error, data } = useQuery(FilterPostsQuery, {
    variables: { searchString, pageNumber },
    skip: searchWord === undefined && searchString === '',
  });

  useEffect(() => {
    if (router.isReady) {
      setSearchString(String(searchWord));
    } else return;
  }, [router.isReady, searchWord, searchString]);

  return (
    <>
      {!loading && data !== undefined && (
        <div className='flex pt-2 space-x-5'>
          <LeftCategoryBox />
          <div className='w-full'>
            <div className='w-full h-[56px] border-y-2 border-black flex items-center p-5 font-semibold text-lg'>
              <div className='text-[#4DB5D9] font-bold'>"{searchString}"</div>에
              대한 검색 결과
            </div>
            <div className='border-b border-[#808080] flex px-3 py-[10px] justify-between'>
              <div className='flex justify-center items-center px-2 w-[60px]'>
                말머리
              </div>
              <div className='flex justify-center items-center px-2 w-[415px]'>
                제목
              </div>
              <div className='flex justify-center items-center px-2 w-[100px]'>
                작성자
              </div>
              <div className='flex justify-center items-center px-2 w-[100px]'>
                작성일
              </div>
              <div className='flex justify-center items-center px-2 w-20'>
                조회
              </div>
              <div className='flex justify-center items-center px-2 w-20'>
                좋아요
              </div>
            </div>

            {data.filterPosts.edges.length !== 0 ? (
              data.filterPosts.edges.map((v: any, i: number) => {
                return (
                  <div
                    className='flex px-3 py-[10px] justify-between border-b border-[#808080] hover:cursor-pointer'
                    key={i}
                    onClick={() => router.push(`/posts/${v.node.id}`)}
                  >
                    <div className='flex justify-center items-center px-2 w-[60px] text-sm text-[#333333]'>
                      {v.node.id}
                    </div>
                    <div className='flex px-2 w-[415px] items-center truncate text-sm text-[#333333]'>
                      <div className='text-[#959595] capitalize'>
                        [{v.node.subCategory}]&nbsp;
                      </div>

                      <p>{highlightedText(v.node.title, searchString)}</p>
                    </div>
                    <div className='flex justify-center items-center px-2 w-[100px] text-sm text-[#666666]'>
                      {v.node.author.name}
                    </div>
                    <div className='flex justify-center items-center px-2 w-[100px] text-sm text-[#666666]'>
                      {v.node.createdAt.replaceAll('-', '.').slice(0, 10)}
                    </div>
                    <div className='flex justify-center items-center px-2 w-20 text-sm text-[#666666]'>
                      {v.node.views}
                    </div>
                    <div className='flex justify-center items-center px-2 w-20 text-sm text-[#666666]'>
                      {v.likeCount}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='flex flex-col w-full h-[250px] justify-center items-center space-y-2 text-[#666666]'>
                <Image
                  src='/asset/images/daelimLogo_gray.svg'
                  alt='daelimLogo_gray'
                  width={100}
                  height={100}
                  priority
                />
                <div className='flex'>
                  <div className='font-bold text-[#4DB5D9] text-lg'>
                    "{searchString}"
                  </div>
                  에 대한 검색 결과가 없습니다.
                </div>
              </div>
            )}
            {data.filterPosts.edges.length !== 0 ? (
              <div className='flex w-full justify-center items-center gap-x-2 pt-3'>
                {pageNumber > 0 && (
                  <ChevronLeftIcon
                    width={20}
                    height={20}
                    onClick={() => {
                      if (pageNumber > 0) {
                        setPageNumber(pageNumber - 1);
                      }
                    }}
                    className='rounded-md bg-gray-200 hover:cursor-pointer'
                  />
                )}

                {/* {data.posts.pageInfo.totalPageCount!} */}
                {pageNumber + 1}
                {data.filterPosts.pageInfo.hasNextPage === true && (
                  <ChevronRightIcon
                    width={20}
                    height={20}
                    onClick={() => {
                      if (
                        pageNumber + 1 <
                        data.filterPosts.pageInfo.totalPageCount
                      ) {
                        setPageNumber(pageNumber + 1);
                      }
                    }}
                    className='rounded-md bg-gray-200 hover:cursor-pointer'
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default searchString;
