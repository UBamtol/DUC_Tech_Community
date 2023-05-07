import Comments from 'components/common/Comments';
import LeftCategoryBox from 'components/LeftCategoryBox';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const PostQuery = gql`
  query Post($postId: Int!) {
    post(postId: $postId) {
      id
      createdAt
      title
      content
      category
      subCategory
      views
      likes {
        id
        authorEmail
      }
      author {
        id
        name
        email
      }
    }
  }
`;

const IncrementViewsMutation = gql`
  mutation IncrementViews($postId: Int!) {
    incrementViews(postId: $postId) {
      id
      createdAt
      title
      content
      views
    }
  }
`;
const CreateLikeMutation = gql`
  mutation CreateLike($postId: Int!, $authorEmail: String!) {
    createLike(postId: $postId, authorEmail: $authorEmail) {
      id
      authorEmail
      postId
    }
  }
`;
const DeleteLikeMutation = gql`
  mutation DeleteLike($postId: Int!, $authorEmail: String!) {
    deleteLike(postId: $postId, authorEmail: $authorEmail) {
      id
      authorEmail
      postId
    }
  }
`;

const postId = () => {
  const router = useRouter();
  const postId = Number(router.query.postId);
  const [isChecked, setIsChecked] = useState(false);
  const { data: session, status } = useSession();
  const { error, data } = useQuery(PostQuery, {
    variables: { postId },
    skip: isNaN(postId),
  });
  const [incrementViews, { loading }] = useMutation(IncrementViewsMutation);
  const [createLike] = useMutation(CreateLikeMutation, {
    refetchQueries: ['Post'],
  });
  const [deleteLike] = useMutation(DeleteLikeMutation, {
    refetchQueries: ['Post'],
  });

  useEffect(() => {
    if (!isNaN(postId)) {
      incrementViews({ variables: { postId } });
    }
  }, [postId]);
  useEffect(() => {
    data !== undefined && data.post.likes.length !== 0
      ? data.post.likes.map((e: any) => {
          if (e.authorEmail === session?.user?.email) {
            setIsChecked(true);
          } else {
            setIsChecked(false);
          }
        })
      : setIsChecked(false);
  }, [data, isChecked]);
  const clickLike = async () => {
    await createLike({
      variables: {
        postId,
        authorEmail: session?.user?.email,
      },
    });
    setIsChecked(true);
  };
  const cancelLike = async () => {
    await deleteLike({
      variables: {
        postId,
        authorEmail: session?.user?.email,
      },
    });
    setIsChecked(false);
  };

  return (
    <>
      {!loading && status === 'authenticated' && data !== undefined && (
        <div className='w-full'>
          <div className='flex w-full justify-between space-x-5 mt-2'>
            <LeftCategoryBox />
            <div className='flex flex-col border border-[#A7A9AC] w-full rounded-md p-[30px] overflow-hidden'>
              <div className='text-sm text-[#959595] capitalize'>
                [{data.post.subCategory}]
              </div>
              <div className='text-[26px] font-semibold truncate overflow-hidden'>
                {data.post.title}
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
                      {data.post.author.name}
                    </div>
                    {/* <div className='text-sm text-[#808080]'>18학번</div> */}
                  </div>
                  <div className='flex space-x-1'>
                    <div className='text-sm text-[#808080]'>
                      {data.post.createdAt.replaceAll('-', '.').slice(0, 10) +
                        ' ' +
                        data.post.createdAt.slice(11, 16)}
                    </div>
                    <div className='text-sm text-[#808080]'>
                      조회수 {data.post.views}
                    </div>
                  </div>
                </div>
              </div>
              {/* 글 상자 */}
              <div className='flex flex-col py-[14px] border-b border-[#A7A9AC]'>
                <div className='pb-48'>{data.post.content}</div>
                <div className='flex space-x-7'>
                  <div className='flex items-center text-sm'>
                    <HandThumbUpIcon
                      className={`text-[#D45151] w-4 h-4 mr-1 ${
                        isChecked ? 'fill-[#D45151]' : null
                      } hover:cursor-pointer`}
                      onClick={() => {
                        isChecked ? cancelLike() : clickLike();
                      }}
                    />
                    좋아요 {data.post.likes.length}
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
