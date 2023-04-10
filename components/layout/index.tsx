import Announcement from 'components/common/Announcement';
import LeftCategoryBox from 'components/LeftCategoryBox';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Header from './header';
import Navbar from './navbar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <div className='flex justify-center bg-slate-100'>
      <div className='w-full max-w-[1080px] h-full bg-white overflow-hidden'>
        <Header />
        <Navbar />
        {router.pathname === '/' && (
          <>
            <Image
              src='/asset/images/testImage.svg'
              alt='메인페이지 이미지'
              width={1080}
              height={250}
              priority
            />
            <Announcement />
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
