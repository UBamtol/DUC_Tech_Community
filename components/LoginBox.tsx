import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const LoginBox = () => {
  const { data: session, status } = useSession();
  if (session) {
    return (
      <>
        <div className='flex flex-col w-full p-5'>
          <div className='flex pb-2'>
            <Image
              src={session.user?.image!}
              alt='유저이미지'
              width={40}
              height={40}
            />
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <div className='text-sm font-semibold'>{session.user?.name}</div>
              <div className='text-xs text-[#808080]'>18학번</div>
            </div>
            <div
              className='flex justify-center items-center w-[60px] h-[30px] bg-[#A7A9AC] text-white text-xs hover:cursor-pointer hover:bg-[#c1c3c7] active:bg-[#888888] rounded-full'
              onClick={() => {
                signOut();
              }}
            >
              로그아웃
            </div>
          </div>
          <div className='text-xs text-[#808080]'>{session.user?.email}</div>
        </div>
        <div className='flex text-xs w-full h-[33px] items-center border-t border-[#808080] divide-x divide-[#808080]'>
          <div className='flex justify-center items-center w-1/3 h-full hover:cursor-pointer hover:font-semibold'>
            게시물
          </div>
          <div className='flex justify-center items-center w-1/3 h-full hover:cursor-pointer hover:font-semibold'>
            댓글
          </div>
          <div className='flex justify-center items-center w-1/3 h-full hover:cursor-pointer hover:font-semibold'>
            공지사항
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className='flex justify-center items-center rounded-sm w-[160px] h-8 bg-[#5A5A5A] text-white font-semibold mx-5 my-[10px] hover:cursor-pointer hover:bg-[#7c7c7c] active:bg-[#6a6a6a]'
          onClick={() => {
            signIn('github');
          }}
        >
          <Image
            className='mr-2'
            src='./asset/images/github_logo_white.svg'
            alt='github_logo_white'
            width={20}
            height={20}
            priority
          />
          GitHub 로그인
        </div>
      </>
    );
  }
};

export default LoginBox;
