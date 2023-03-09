import Announcement from 'components/common/Announcement';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Image
        src='/asset/images/testImage.svg'
        alt='메인페이지 이미지'
        width={1080}
        height={250}
      />
      <Announcement />
    </>
  );
};

export default Home;
