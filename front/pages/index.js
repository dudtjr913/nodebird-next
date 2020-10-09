/* Next에서는 pages폴더 안에 있는 파일들은 모두 한 page라고 읽고,
next.js는 React의 프레임워크이기 때문에 import React from "react"를 하지 않아도 된다.
하지만 불안하면 해도 된다. */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST } from '../reducers/post';
import ScreenUp from '../components/ScreenUp';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { mainPosts, postLoadLoading, hasPosts } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    const handleOnscroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 400
      ) {
        if (hasPosts && !postLoadLoading) {
          console.log('AA');
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    };
    window.addEventListener('scroll', handleOnscroll);
    return () => {
      window.removeEventListener('scroll', handleOnscroll);
    };
  }, [postLoadLoading]);

  return (
    <>
      <Head>
        <title>메인화면 | NodeBird</title>
      </Head>
      <AppLayout>
        {user && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <ScreenUp />
      </AppLayout>
    </>
  );
};

export default Home;
