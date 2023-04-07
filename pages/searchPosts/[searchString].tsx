import { useQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import LeftCategoryBox from 'components/LeftCategoryBox';
import { clear } from 'console';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const FilterPostsQuery = gql`
  query FilterPosts($searchString: String!) {
    filterPosts(searchString: $searchString) {
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

const searchString = () => {
  const highlightedText = (text: string, query: string) => {
    if (text.includes(query)) {
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
  const { loading, error, data } = useQuery(FilterPostsQuery, {
    variables: { searchString },
    skip: searchWord === undefined && searchString === '',
  });

  useEffect(() => {
    if (router.isReady) {
      setSearchString(String(searchWord));
    } else return;
  }, [router.isReady, searchWord]);

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

            {data.filterPosts.length !== 0 ? (
              data.filterPosts.map((v: any, i: number) => {
                return (
                  <div
                    className='flex px-3 py-[10px] justify-between border-b border-[#808080]'
                    key={i}
                  >
                    <div className='flex justify-center items-center px-2 w-[60px] text-sm text-[#333333]'>
                      {v.id}
                    </div>
                    <div className='flex px-2 w-[415px] items-center truncate text-sm text-[#333333]'>
                      <div className='text-[#959595] capitalize'>
                        [{v.subCategory}]&nbsp;
                      </div>

                      <p>{highlightedText(v.title, searchString)}</p>
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
                <div className='flex'>
                  <div className='font-bold text-[#4DB5D9] text-lg'>
                    "{searchString}"
                  </div>
                  에 대한 검색 결과가 없습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default searchString;
