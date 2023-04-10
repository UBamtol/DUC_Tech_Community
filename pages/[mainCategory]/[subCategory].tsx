import { useQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import LeftCategoryBox from 'components/LeftCategoryBox';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const FilterCategoryQuery = gql`
  query FilterCategory($searchCategory: String!) {
    filterCategory(searchCategory: $searchCategory) {
      id
      createdAt
      title
      subCategory
      views
      author {
        name
      }
    }
  }
`;

const postCategory = () => {
  const router = useRouter();
  const { mainCategory, subCategory } = router.query;
  const [searchCategory, setSearchCategory] = useState('');
  const { loading, error, data } = useQuery(FilterCategoryQuery, {
    variables: { searchCategory },
    skip: subCategory === undefined && searchCategory === '',
  });

  useEffect(() => {
    if (router.isReady) {
      setSearchCategory(String(subCategory));
    } else return;
  }, [router.isReady, subCategory]);

  return (
    <>
      {!loading && data !== undefined && (
        <div className='flex pt-2 space-x-5'>
          <LeftCategoryBox />
          <div className='w-full'>
            <div className='w-full h-[56px] border-y-2 border-black flex items-center p-5 font-semibold text-lg'>
              <div className='font-bold capitalize'>{searchCategory}</div>
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

            {data.filterCategory.length !== 0 ? (
              data.filterCategory.map((v: any, i: number) => {
                return (
                  <div
                    className='flex px-3 py-[10px] justify-between border-b border-[#808080] hover:cursor-pointer'
                    key={i}
                    onClick={() => router.push(`/posts/${v.id}`)}
                  >
                    <div className='flex justify-center items-center px-2 w-[60px] text-sm text-[#333333]'>
                      {v.id}
                    </div>
                    <div className='flex px-2 w-[415px] items-center truncate text-sm text-[#333333]'>
                      <div className='text-[#959595] capitalize'>
                        [{v.subCategory}]&nbsp;
                      </div>

                      <p>{v.title}</p>
                    </div>
                    <div className='flex justify-center items-center px-2 w-[100px] text-sm text-[#666666]'>
                      {v.author.name}
                    </div>
                    <div className='flex justify-center items-center px-2 w-[100px] text-sm text-[#666666]'>
                      {v.createdAt.replaceAll('-', '.').slice(0, 10)}
                    </div>
                    <div className='flex justify-center items-center px-2 w-20 text-sm text-[#666666]'>
                      {v.views}
                    </div>
                    <div className='flex justify-center items-center px-2 w-20 text-sm text-[#666666]'>
                      202
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
                    "{searchCategory}"&nbsp;
                  </div>
                  에 대한 게시글이 없습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default postCategory;
