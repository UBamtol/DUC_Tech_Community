import React from 'react';
import LoginBox from './LoginBox';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

const LeftCategoryBox = () => {
  const frontEnd = ['Rect.js', 'Next.js', 'Javascript', 'HTML', 'CSS'];
  const backEnd = ['Rect.js', 'Next.js', 'Javascript', 'HTML', 'CSS'];
  const freeBoard = ['비밀게시판', '동아리 홍보'];
  return (
    <div className='flex flex-col justify-center items-center border-t-2 border-black w-[200px] min-w-[200px] mr-5 '>
      <LoginBox />
      <div className='w-full flex  justify-start items-center border-t-2 border-[#808080] px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'>
        <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
        전체 글 보기
      </div>
      <div className='w-full flex flex-col justify-start items-center border-y-2 border-[#808080] text-sm'>
        <div className='w-full border-b-1 border-[#808080] font-semibold px-5 py-3 hover:cursor-pointer hover:font-bold hover:bg-[#808080]/5'>
          Front-end
        </div>
        <div className='w-full items-center border-t border-[#808080]'>
          {frontEnd.map((v, i) => {
            return (
              <div
                className='w-full flex justify-start items-center px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'
                key={i}
              >
                <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
                {v}
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-full flex flex-col justify-start items-center border-b-2 border-[#808080] text-sm'>
        <div className='w-full border-b-1 border-[#808080] font-semibold px-5 py-3 hover:cursor-pointer hover:font-bold hover:bg-[#808080]/5'>
          Back-end
        </div>
        <div className='w-full items-center border-t border-[#808080]'>
          {backEnd.map((v, i) => {
            return (
              <div
                className='w-full flex justify-start items-center px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'
                key={i}
              >
                <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
                {v}
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-full flex flex-col justify-start items-center border-b-2 border-[#808080] text-sm'>
        <div className='w-full border-b-1 border-[#808080] font-semibold px-5 py-3 hover:cursor-pointer hover:font-bold hover:bg-[#808080]/5'>
          자유게시판
        </div>
        <div className='w-full items-center border-t border-[#808080]'>
          {freeBoard.map((v, i) => {
            return (
              <div
                className='w-full flex justify-start items-center px-5 py-3 text-xs hover:cursor-pointer hover:font-semibold hover:bg-[#808080]/5'
                key={i}
              >
                <Bars3BottomLeftIcon className='w-3 h-3 border border-black text-black mr-1' />
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftCategoryBox;
