import Announcement from 'components/common/Announcement';
import LeftCategoryBox from 'components/LeftCategoryBox';
import PostingCategoryBox from 'components/PostingCategoryBox';
import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className='w-full'>
      <div className='flex w-full justify-between space-x-5'>
        <LeftCategoryBox />
        {/* 글 목록 박스 */}
        <div className='w-full h-full flex flex-col space-y-5 overflow-hidden'>
          <div className='flex space-x-5'>
            <div className='border-t-2 border-black w-1/2 overflow-auto'>
              <PostingCategoryBox />
            </div>
            <div className='border-t-2 border-black w-1/2 overflow-auto'>
              <PostingCategoryBox />
            </div>
          </div>
          <div className='border-t-2 border-black w-full'>
            <PostingCategoryBox />
          </div>
          <div className='border-t-2 border-black w-full'>
            <PostingCategoryBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
