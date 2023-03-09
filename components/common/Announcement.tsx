import React from 'react';

const Announcement = () => {
  return (
    <div className='p-2'>
      <div className='w-full h-[50px] bg-[#F3F3F3] rounded-lg flex items-center'>
        <div className='text-md font-bold text-[#ED0000] shrink-0 px-5 py-4'>
          공지
        </div>
        <div className='text-sm truncate whitespace-nowrap pr-5'>
          Lorem ipsum dolor sit amet consectetur. Turpis etiam cursus est
          consectetur. A diam id in cursus vitae iaculis ut. Felis imperdiet
          sagittis sed mi semper risus dignissim pharetra sed. Egestas
          scelerisque in urna at fringilla.
        </div>
      </div>
    </div>
  );
};

export default Announcement;
