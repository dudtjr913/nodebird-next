/* Next에서는 pages폴더 안에 있는 파일들은 모두 한 page라고 읽고,
next.js는 React의 프레임워크이기 때문에 import React from "react"를 하지 않아도 된다.
하지만 불안하면 해도 된다. */
import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { logInDone } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <>
      <Head>
        <title>메인화면 | NodeBird</title>
      </Head>
      <AppLayout>
        {logInDone && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default Home;
