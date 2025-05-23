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
              <PostingCategoryBox
                category='최신 게시글'
                queryPath='latest'
                isFreeBoard={false}
              />
            </div>
            <div className='border-t-2 border-black w-1/2 overflow-auto'>
              <PostingCategoryBox
                category='인기 게시글'
                queryPath='popular'
                isFreeBoard={false}
              />
            </div>
          </div>
          <div className='border-t-2 border-black w-full'>
            <PostingCategoryBox
              category='자유 게시판'
              queryPath='자유 게시판'
              isFreeBoard={true}
            />
          </div>
          <div className='border-t-2 border-black w-full'>
            <PostingCategoryBox
              category='동아리 홍보'
              queryPath='동아리 홍보'
              isFreeBoard={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
