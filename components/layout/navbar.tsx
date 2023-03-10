import SearchBar from 'components/common/SearchBar';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className='w-full h-[50px] flex justify-between items-center p-2.5 bg-[#4DB5D9] text-white'>
        <div className='flex items-center'>
          <div className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'>
            대림대학교
          </div>
          <div className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'>
            셔틀버스
          </div>
          <div className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'>
            학사공지
          </div>
          <div className='text-lg font-semibold p-2.5 hover:cursor-pointer hover:text-xl duration-200'>
            학사일정
          </div>
        </div>
        <SearchBar />
      </div>
    </>
  );
};

export default Navbar;
