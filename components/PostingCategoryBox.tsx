import React from 'react';

const PostingCategoryBox = () => {
  return (
    <>
      <div className='flex flex-col w-full h-[56px]'>
        <div className='w-full h-full border-b-2 border-[$808080] flex items-center p-5 font-semibold font-lg'>
          Top 10
        </div>
        <ul className='list-inside list-disc px-2 py-2 text-xs'>
          <li className='truncate py-2'>
            Lorem ipsum dolor sit amet consectetur. Posuere volutpat rs a vitae
            mi venenatis cursus. Velit sem sed leo sit in in mi nibh lectus.
            Quis leo ut amet cursus gravida. Commodo nulla gravida sit non nisl
            massa.
          </li>
          <li className='truncate py-2'>
            Lorem ipsum dolor sit amet consectetur. Posuere volutpat rs a vitae
            mi venenatis cursus. Velit sem sed leo sit in in mi nibh lectus.
            Quis leo ut amet cursus gravida. Commodo nulla gravida sit non nisl
            massa.
          </li>
          <li className='truncate py-2'>
            Lorem ipsum dolor sit amet consectetur. Posuere volutpat rs a vitae
            mi venenatis cursus. Velit sem sed leo sit in in mi nibh lectus.
            Quis leo ut amet cursus gravida. Commodo nulla gravida sit non nisl
            massa.
          </li>
        </ul>
        <div></div>
      </div>
    </>
  );
};

export default PostingCategoryBox;
