import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className='flex justify-between items-center border-t-2 border-black w-full mt-40 px-5'>
        <div className='flex items-center divide-x'>
          <div className='flex pr-4 text-sm'>DUC Tech Community</div>
          <Link
            href='http://localhost:3000'
            className='flex text-xs text-[#808080] pl-4 hover:cursor-pointer hover:underline'
          >
            © 2022 YuInJun All rights reserved.
          </Link>
        </div>
        <div className='h-[50px] flex items-center'>
          <Image
            className='mr-[5px]'
            src='/asset/images/daelimFooterLogo_gray.svg'
            alt='대림대로고'
            width={100}
            height={25}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
