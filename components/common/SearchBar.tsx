import React from 'react';

const SearchBar = () => {
  return (
    <div className='flex w-[280px] h-[35px]'>
      <input
        type='search'
        className='w-full min-w-[190px] h-full bg-white rounded-l-md px-3 text-black outline-none'
        placeholder='검색어를 입력해주세요.'
      ></input>
      <input
        type='button'
        value='검색'
        className='min-w-[50px] h-full bg-[#A7A9AC] text-white text-sm flex justify-center items-center rounded-r-md font-semibold hover:cursor-pointer hover:bg-[#b1b1b1] active:bg-[#8c8c8c]'
      />
    </div>
  );
};

export default SearchBar;
