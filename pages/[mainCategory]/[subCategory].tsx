import LeftCategoryBox from 'components/LeftCategoryBox';
import { useRouter } from 'next/router';
import React from 'react';

const postCategory = () => {
  const router = useRouter();
  const { mainCategory, subCategory } = router.query;

  return (
    <div className='flex mt-2 space-x-5'>
      <LeftCategoryBox />
      <div className='w-full'>
        <div className='w-full h-[56px] border-y-2 border-black flex items-center p-5 font-semibold text-lg capitalize'>
          {mainCategory === 'category'
            ? '전체 글 보기'
            : subCategory === 'allPosts'
            ? mainCategory === 'free-board'
              ? '자유게시판'
              : mainCategory
            : subCategory}
        </div>
        <div className='border-b border-[#808080] flex px-5 py-[10px] justify-between'>
          <div className='flex justify-center items-center px-2 w-[60px]'>
            말머리
          </div>
          <div className='flex justify-center items-center px-2 w-[415px]'>
            제목
          </div>
          <div className='flex justify-center items-center px-2 w-[100px]'>
            작성자
          </div>
          <div className='flex justify-center items-center px-2 w-[100px]'>
            작성일
          </div>
          <div className='flex justify-center items-center px-2 w-20'>조회</div>
          <div className='flex justify-center items-center px-2 w-20'>
            좋아요
          </div>
        </div>
        <div className='flex px-5 py-[10px] justify-between border-b border-[#808080]'>
          <div className='flex justify-center items-center px-2 w-[60px] text-sm text-[#333333]'>
            274
          </div>
          <div className='px-2 w-[415px] truncate text-sm text-[#333333]'>
            [Next.js] Lorem ipsum dolor sit amet consectetur. Posuere volutpat
            rhoncus a vitae mi venenatis cursus. Velit sem sed leo sit in in mi
            nibh lectus. Quis leo ut amet cursus gravida. Commodo nulla gravida
            sit non nisl massa.
          </div>
          <div className='flex justify-center items-center px-2 w-[100px] text-sm text-[#666666]'>
            대림이
          </div>
          <div className='flex justify-center items-center px-2 w-[100px] text-sm text-[#666666]'>
            2022.12.20
          </div>
          <div className='flex justify-center items-center px-2 w-20 text-sm text-[#666666]'>
            198
          </div>
          <div className='flex justify-center items-center px-2 w-20 text-sm text-[#666666]'>
            202
          </div>
        </div>
      </div>
    </div>
  );
};

export default postCategory;
