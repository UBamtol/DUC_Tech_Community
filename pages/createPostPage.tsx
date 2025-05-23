import LeftCategoryBox from 'components/LeftCategoryBox';
import React, { useState, Fragment, useEffect } from 'react';
import listData from '../public/db/listData.json';
import { MyListBox } from 'components/common/MyListBox';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const CreatePostMutation = gql`
  mutation CreatePost(
    $category: String!
    $subCategory: String!
    $title: String!
    $content: String!
    $authorEmail: String!
  ) {
    createPost(
      category: $category
      subCategory: $subCategory
      title: $title
      content: $content
      authorEmail: $authorEmail
    ) {
      id
      createdAt
      title
      content
      category
      subCategory
      author {
        email
      }
    }
  }
`;

const FilterPostingCategoryQuery = gql`
  query FilterPostingCategory($queryPath: String!) {
    filterPostingCategory(queryPath: $queryPath) {
      id
      content
      author {
        name
      }
    }
  }
`;

const createPostPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mainCategory, setMainCategory] = useState('FRONTEND');
  const [categoryList, setCategoryList] = useState(listData.frontEnd);
  const [subCategory, setSubCategory] = useState(categoryList[0]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const { data, refetch } = useQuery(FilterPostingCategoryQuery, {
    variables: { queryPath: subCategory },
    skip: subCategory === undefined,
  });
  const [createPost, { loading, error }] = useMutation(CreatePostMutation, {
    onCompleted: async () => {
      const response = await refetch();
      router.push(`/posts/${response.data.filterPostingCategory[0].id}`);
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await createPost({
      variables: {
        category: mainCategory,
        subCategory,
        title: postTitle,
        content: postContent,
        authorEmail: session?.user?.email,
      },
    });
  };

  return (
    <div className='flex pt-2 space-x-5'>
      <LeftCategoryBox />
      <div className='border-t-2 border-black w-full'>
        <div className='w-full h-[56px] border-b-2 border-[#808080] flex items-center p-5 font-semibold text-base'>
          글쓰기
        </div>
        <form onSubmit={onSubmit}>
          <fieldset className='flex p-5 items-center'>
            <div className='mr-5 font-semibold text-sm'>카테고리</div>
            <div className='flex space-x-2 text-sm'>
              <div className='flex items-center'>
                <input
                  id='frontEnd'
                  className='peer/frontEnd mr-[5px] checked:accent-[##4DB5D9]'
                  type='radio'
                  name='status'
                  checked={mainCategory === 'FRONTEND' ? true : false}
                  onChange={() => {
                    setMainCategory('FRONTEND'),
                      setCategoryList(listData.frontEnd);
                  }}
                />
                <label
                  htmlFor='frontEnd'
                  className='peer-checked/frontEnd:text-sky-500 shrink-0'
                >
                  front-end
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='backEnd'
                  className='peer/backEnd mr-[5px] checked:accent-[##4DB5D9]'
                  type='radio'
                  name='status'
                  checked={mainCategory === 'BACKEND' ? true : false}
                  onChange={() => {
                    setMainCategory('BACKEND'),
                      setCategoryList(listData.backEnd);
                  }}
                />
                <label
                  htmlFor='backEnd'
                  className='peer-checked/backEnd:text-sky-500 shrink-0'
                >
                  back-end
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='freeBoard'
                  className='peer/freeBoard mr-[5px] checked:accent-[##4DB5D9]'
                  type='radio'
                  name='status'
                  checked={mainCategory === 'FREEBOARD' ? true : false}
                  onChange={() => {
                    setMainCategory('FREEBOARD'),
                      setCategoryList(listData.freeBoard);
                  }}
                />
                <label
                  htmlFor='freeBoard'
                  className='peer-checked/freeBoard:text-sky-500 shrink-0'
                >
                  자유게시판
                </label>
              </div>
            </div>
            <MyListBox
              categoryList={categoryList}
              subCategory={subCategory}
              setSubCategory={setSubCategory}
            />
          </fieldset>

          <div className='border-b-2 border-[#808080] p-5'>
            <label htmlFor='title' />
            <input
              id='title'
              className='appearance-none text-xl w-full outline-none'
              placeholder='제목'
              maxLength={30}
              type='text'
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
          </div>
          <div className='border-b-2 border-[#808080] p-5 mb-[10px]'>
            <label htmlFor='content' />
            <textarea
              id='content'
              className='appearance-none text-base min-w-full min-h-[500px] outline-none'
              placeholder='내용을 입력해주세요. (최대 1000자)'
              maxLength={1000}
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className={`bg-[#4DB5D9] text-white p-2 rounded-lg text-base ${
                (!!postTitle?.trim() && !!postContent?.trim()) === false &&
                'border border-[#cfcfcf] bg-[#f4f4f4] text-[#cfcfcf]'
              }`}
              type='submit'
              disabled={
                (!!postTitle?.trim() && !!postContent?.trim()) === false
              }
            >
              글 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createPostPage;
