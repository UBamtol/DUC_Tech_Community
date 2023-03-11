import Announcement from 'components/common/Announcement';
import LeftCategoryBox from 'components/LeftCategoryBox';
import PostingCategoryBox from 'components/PostingCategoryBox';
import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Image
        src='/asset/images/testImage.svg'
        alt='메인페이지 이미지'
        width={1080}
        height={250}
      />
      <Announcement />
      <div className='flex justify-between'>
        <LeftCategoryBox />
        {/* 글 목록 박스 */}
        <div className='w-full flex justify-between'>
          <div className='border-t-2 border-black w-[50%] mr-5'>
            <PostingCategoryBox />
          </div>

          <div className='border-t-2 border-black w-[50%]'></div>
        </div>
      </div>
    </>
  );
};

export default Home;
