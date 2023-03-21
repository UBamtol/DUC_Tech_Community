import SearchBar from 'components/common/SearchBar';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className='w-full h-[50px] flex justify-between items-center p-2.5 bg-[#4DB5D9] text-white'>
        <div className='flex items-center'>
          <Link
            href='https://www.daelim.ac.kr/index.do'
            className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'
            target='_blank'
          >
            대림대학교
          </Link>
          <Link
            href='https://www.daelim.ac.kr/cms/FrCon/index.do?MENU_ID=460'
            className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'
            target='_blank'
          >
            셔틀버스
          </Link>
          <Link
            href='https://dept.daelim.ac.kr/csw/cms/FrCon/index.do?MENU_ID=280#page1'
            className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'
            target='_blank'
          >
            학사공지
          </Link>
          <Link
            href='https://dept.daelim.ac.kr/csw/cms/FrCon/index.do?MENU_ID=290'
            className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'
            target='_blank'
          >
            학사일정
          </Link>
        </div>
        <SearchBar />
      </div>
    </>
  );
};

export default Navbar;
