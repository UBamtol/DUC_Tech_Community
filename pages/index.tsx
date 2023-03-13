import Announcement from 'components/common/Announcement';
import LeftCategoryBox from 'components/LeftCategoryBox';
import PostingCategoryBox from 'components/PostingCategoryBox';
import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className='w-full'>
      <Image
        src='/asset/images/testImage.svg'
        alt='메인페이지 이미지'
        width={1080}
        height={250}
      />
      <Announcement />
      <div className='flex w-full justify-between'>
        <LeftCategoryBox />
        {/* 글 목록 박스 */}
        <div className='w-full h-screen flex flex-col justify-between overflow-hidden'>
          <div className='flex space-x-5'>
            <div className='border-t-2 border-black w-[420px]'>
              <PostingCategoryBox />
            </div>
            <div className='border-t-2 border-black w-[420px]'>
              <PostingCategoryBox />
            </div>
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
