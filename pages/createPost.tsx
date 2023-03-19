import LeftCategoryBox from 'components/LeftCategoryBox';
import React, { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import listData from '../public/db/listData.json';
import { MyListBox } from 'components/common/MyListBox';

const createPost = () => {
  const [isChecked, setIsChecked] = useState('frontEnd');
  const [checkedList, setCheckedList] = useState(listData.frontEnd);
  return (
    <div className='flex mt-2 space-x-5'>
      <LeftCategoryBox />
      <div className='border-t-2 border-black w-full'>
        <div className='w-full h-[56px] border-b-2 border-[#808080] flex items-center p-5 font-semibold text-base'>
          글쓰기
        </div>
        <fieldset className='flex p-5 items-center'>
          <div className='mr-5 font-semibold text-sm'>카테고리</div>
          <div className='flex space-x-2 text-sm'>
            <div className='flex items-center'>
              <input
                id='frontEnd'
                className='peer/frontEnd mr-[5px] checked:accent-[##4DB5D9]'
                type='radio'
                name='status'
                checked={isChecked === 'frontEnd' ? true : false}
                onChange={() => {
                  setIsChecked('frontEnd'), setCheckedList(listData.frontEnd);
                }}
              />
              <label
                htmlFor='frontEnd'
                className='peer-checked/frontEnd:text-sky-500'
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
                checked={isChecked === 'backEnd' ? true : false}
                onChange={() => {
                  setIsChecked('backEnd'), setCheckedList(listData.backEnd);
                }}
              />
              <label
                htmlFor='backEnd'
                className='peer-checked/backEnd:text-sky-500'
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
                checked={isChecked === 'freeBoard' ? true : false}
                onChange={() => {
                  setIsChecked('freeBoard'), setCheckedList(listData.freeBoard);
                }}
              />
              <label
                htmlFor='freeBoard'
                className='peer-checked/freeBoard:text-sky-500'
              >
                자유게시판
              </label>
            </div>
          </div>
          <MyListBox isChecked={isChecked} checkedList={checkedList} />

          {/* <div className='hidden peer-checked/frontEnd:block'>
            Drafts are only visible to administrators.
          </div>
          <div className='hidden peer-checked/backEnd:block'>
            Your post will be publicly visible on your site.
          </div> */}
        </fieldset>
        <div className='border-b-2 border-[#808080] p-5'>
          <input
            className='appearance-none text-xl'
            placeholder='제목'
            type='text'
          ></input>
        </div>
        <div className='border-b-2 border-[#808080] p-5 mb-[10px]'>
          <textarea
            className='appearance-none text-base min-w-full min-h-[500px]'
            placeholder='내용을 입력해주세요.'
          ></textarea>
        </div>
        <div>
          <button className='bg-[#4DB5D9] text-white p-2 rounded-lg text-base'>
            글 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default createPost;
