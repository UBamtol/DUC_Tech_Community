import { useQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

// interface SearchType {
//   setSearchWord: React.Dispatch<React.SetStateAction<string>>;
// }

const SearchBar = () => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');

  return (
    <div className='flex w-[280px] h-[35px]'>
      <input
        type='search'
        className='w-full min-w-[190px] h-full bg-white rounded-l-md px-3 text-black outline-none'
        placeholder='검색어를 입력해주세요.'
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (searchWord !== '') {
              router.replace(`/searchPosts/${searchWord}`);
            } else {
              alert('검색어를 입력해주세요.');
            }
          }
        }}
      ></input>
      <input
        type='button'
        value='검색'
        className='min-w-[50px] h-full bg-[#A7A9AC] text-white text-sm flex justify-center items-center rounded-r-md font-semibold hover:cursor-pointer hover:bg-[#b1b1b1] active:bg-[#8c8c8c]'
        onClick={() => {
          if (searchWord !== '') {
            router.replace(`/searchPosts/${searchWord}`);
          } else {
            alert('검색어를 입력해주세요.');
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
