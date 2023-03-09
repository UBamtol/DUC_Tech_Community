import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  // const { data: session, status } = useSession();

  return (
    <>
      <Link className='w-full h-[50px] flex items-center shadow-sm' href='/'>
        <Image
          className='ml-[20px] mr-[5px]'
          src='/asset/images/daelimLogo.svg'
          alt='대림대로고'
          width={30}
          height={30}
        />
        <p className='text-xl'>Daelim Tech Community</p>
        {/* <div className='border border-black' onClick={() => signIn('github')}>
          로그인
        </div> */}
      </Link>
    </>
  );
};

export default Header;
