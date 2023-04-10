import { useQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import React from 'react';

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
      <div className='w-full h-[50px] bg-[#F3F3F3] rounded-lg flex items-center'>
        <div className='text-md font-bold text-[#ED0000] shrink-0 px-5 py-4'>
          공지
        </div>
        <div className='text-sm truncate whitespace-nowrap pr-5'>
          {!loading && data.notice.content}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
