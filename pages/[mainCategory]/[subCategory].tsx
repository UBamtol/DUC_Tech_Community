import { useQuery } from '@apollo/client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { gql } from 'apollo-server-micro';
import LeftCategoryBox from 'components/LeftCategoryBox';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const FilterCategoryQuery = gql`
  query FilterCategory(
    $searchCategory: String!
    $pageNumber: Int!
    $mainCategory: String!
  ) {
    filterCategory(
      searchCategory: $searchCategory
      pageNumber: $pageNumber
      mainCategory: $mainCategory
    ) {
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

const postCategory = () => {
  const router = useRouter();
  const { mainCategory, subCategory } = router.query;
  const [searchCategory, setSearchCategory] = useState('');
  const [mainCategoryPath, setMainCategoryPath] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, error, data } = useQuery(FilterCategoryQuery, {
    variables: { mainCategory: mainCategoryPath, searchCategory, pageNumber },
    skip:
      subCategory === undefined &&
      searchCategory === '' &&
      mainCategoryPath === undefined,
  });
  useEffect(() => {
    if (router.isReady) {
      setMainCategoryPath(String(mainCategory).replace('-', '').toUpperCase()),
        setSearchCategory(String(subCategory));
    } else return;
  }, [router.isReady, subCategory, mainCategoryPath]);

  return (
    <>
      {!loading && data !== undefined && (
        <div className='flex pt-2 space-x-5'>
          <LeftCategoryBox />
          <div className='w-full'>
            <div className='w-full h-[56px] border-y-2 border-black flex items-center p-5 font-semibold text-lg'>
              <div className='font-bold capitalize'>
                {subCategory === 'allPosts'
                  ? mainCategory === 'free-board'
                    ? '기타 게시판'
                    : mainCategory
                  : subCategory}
              </div>
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

            {data.filterCategory.edges.length !== 0 ? (
              data.filterCategory.edges.map((v: any, i: number) => {
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

                      <p>{v.node.title}</p>
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
                <div className='flex items-center'>
                  <div className='font-bold text-[#4DB5D9] text-lg'>
                    "{subCategory === 'allPosts' ? mainCategory : subCategory}
                    "&nbsp;
                  </div>
                  에 대한 게시글이 없습니다.
                </div>
              </div>
            )}
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
              {data.filterCategory.edges.length !== 0 && pageNumber + 1}
              {data.filterCategory.pageInfo.hasNextPage === true && (
                <ChevronRightIcon
                  width={20}
                  height={20}
                  onClick={() => {
                    if (
                      pageNumber + 1 <
                      data.filterCategory.pageInfo.totalPageCount
                    ) {
                      setPageNumber(pageNumber + 1);
                    }
                  }}
                  className='rounded-md bg-gray-200 hover:cursor-pointer'
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default postCategory;
