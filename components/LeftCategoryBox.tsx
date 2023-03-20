import React from 'react';
import LoginBox from './LoginBox';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import listData from '../public/db/listData.json';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

const LeftCategoryBox = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-center border-t-2 border-black w-[200px] min-w-[200px]'>
      <LoginBox />
      <Link
        className='w-full flex  justify-start items-center border-t-2 border-[#808080] px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'
        href='/category/allPosts'
      >
        <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
        전체 글 보기
      </Link>
      <div className='w-full flex flex-col justify-start items-center border-y-2 border-[#808080] text-sm'>
        <Link
          className='w-full border-b-1 border-[#808080] font-semibold px-5 py-3 hover:cursor-pointer hover:font-bold hover:bg-[#808080]/5'
          href='/front-end/allPosts'
        >
          Front-end
        </Link>
        <div className='w-full items-center border-t border-[#808080]'>
          {listData.frontEnd.map((v, i) => {
            return (
              <Link
                className='w-full flex justify-start items-center px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'
                key={i}
                href={`/front-end/${v}`}
              >
                <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
                {v}
              </Link>
            );
          })}
        </div>
      </div>
      <div className='w-full flex flex-col justify-start items-center border-b-2 border-[#808080] text-sm'>
        <Link
          className='w-full border-b-1 border-[#808080] font-semibold px-5 py-3 hover:cursor-pointer hover:font-bold hover:bg-[#808080]/5'
          href='/back-end/allPosts'
        >
          Back-end
        </Link>
        <div className='w-full items-center border-t border-[#808080]'>
          {listData.backEnd.map((v, i) => {
            return (
              <Link
                className='w-full flex justify-start items-center px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'
                key={i}
                href={`/back-end/${v}`}
              >
                <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
                {v}
              </Link>
            );
          })}
        </div>
      </div>
      <div className='w-full flex flex-col justify-start items-center border-b-2 border-[#808080] text-sm'>
        <Link
          className='w-full border-b-1 border-[#808080] font-semibold px-5 py-3 hover:cursor-pointer hover:font-bold hover:bg-[#808080]/5'
          href='/free-board/allPosts'
        >
          자유게시판
        </Link>
        <div className='w-full items-center border-t border-[#808080]'>
          {listData.freeBoard.map((v, i) => {
            return (
              <Link
                className='w-full flex justify-start items-center px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'
                key={i}
                href={`/free-board/${v}`}
              >
                <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
                {v}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftCategoryBox;
