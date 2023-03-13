import React, { ReactNode } from 'react';
import Header from './header';
import Navbar from './navbar';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className='flex justify-center  bg-slate-100'>
      <div className='w-full max-w-[1080px] h-full bg-white overflow-auto'>
        <Header />
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
