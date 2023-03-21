import Comments from 'components/common/Comments';
import LeftCategoryBox from 'components/LeftCategoryBox';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

const postId = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'authenticated' && (
        <div className='w-full'>
          <div className='flex w-full justify-between space-x-5 mt-2'>
            <LeftCategoryBox />
            <div className='flex flex-col border border-[#A7A9AC] w-full rounded-md p-[30px] overflow-hidden'>
              <div className='text-sm text-[#959595]'>[Next.js]</div>
              <div className='text-[26px] font-semibold truncate overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur. Posuere volutpat rhoncus
                a vitae mi venenatis cursus. Velit sem sed leo sit in in mi nibh
                lectus. Quis leo ut amet cursus gravida. Commodo nulla gravida
                sit non nisl massa.
              </div>
              {/* 유저 프로필, 글정보 */}
              <div className='flex border-b border-[#A7A9AC] py-[14px] space-x-2'>
                <Image
                  src={session?.user?.image!}
                  alt='유저이미지'
                  width={40}
                  height={40}
                />

                <div className='flex flex-col'>
                  <div className='flex space-x-1'>
                    <div className='font-semibold text-sm'>
                      {session?.user?.name}
                    </div>
                    <div className='text-sm text-[#808080]'>18학번</div>
                  </div>
                  <div className='flex space-x-1'>
                    <div className='text-sm text-[#808080]'>
                      2023.03.21 21:27
                    </div>
                    <div className='text-sm text-[#808080]'>조회 177</div>
                  </div>
                </div>
              </div>
              {/* 글 상자 */}
              <div className='flex flex-col py-[14px] border-b border-[#A7A9AC]'>
                <div className='pb-48'>
                  Lorem ipsum dolor sit amet consectetur. Vitae elit mi aliquet
                  vulputate elit nulla. Purus adipiscing mattis consectetur
                  habitant auctor. Scelerisque sit tristique amet lorem nascetur
                  pellentesque sagittis. Amet posuere diam sit eget commodo
                  condimentum. Vitae odio est semper dis mi et eros.
                </div>
                <div className='flex space-x-7'>
                  <div className='flex items-center text-sm'>
                    <HandThumbUpIcon className='text-[#D45151] w-4 h-4 mr-1' />
                    좋아요 12
                  </div>
                  <div className='flex items-center text-sm'>
                    <ChatBubbleOvalLeftEllipsisIcon className='text-[#0095C8] w-4 h-4 mr-1' />
                    댓글 13
                  </div>
                </div>
              </div>
              <Comments />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default postId;
