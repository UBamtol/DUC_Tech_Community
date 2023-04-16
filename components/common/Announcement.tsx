import { useQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import React, { useEffect } from 'react';

const NoticeQuery = gql`
  query Notice {
    notice {
      content
    }
  }
`;

const Announcement = () => {
  const { loading, error, data } = useQuery(NoticeQuery);

  return (
    <div className='p-2'>
      <div className='w-full h-[50px] bg-[#F3F3F3] rounded-lg flex items-center px-5'>
        <div className='text-md font-bold text-[#ED0000] shrink-0 pr-5 py-4'>
          공지
        </div>
        <div className='flex flex-row relative w-full overflow-hidden h-7 items-center '>
          <div className='flex w-full h-full absolute z-10 justify-between'>
            <div className='w-5 h-7 abosolute shrink-0 bg-gradient-to-r from-[#F3F3F3]' />
            <div className='w-5 h-7 abosolute  shrink-0 bg-gradient-to-l from-[#F3F3F3]' />
          </div>
          <div className='flex flex-row text-sm absolute whitespace-nowrap animate-roller shrink'>
            <div className='w-full px-2'>{!loading && data.notice.content}</div>
          </div>
          <div className='flex flex-row text-sm translate-x-12 whitespace-nowrap animate-roller'>
            <div className='w-full px-2 translate-x-full'>
              {!loading && data.notice.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
