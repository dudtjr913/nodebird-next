/* Next에서는 pages폴더 안에 있는 파일들은 모두 한 page라고 읽고,
next.js는 React의 프레임워크이기 때문에 import React from "react"를 하지 않아도 된다.
하지만 불안하면 해도 된다. */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import ScreenUp from '../components/ScreenUp';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { mainPosts, postsLoadLoading, hasPosts, retweetError } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    const handleOnscroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 400
      ) {
        if (hasPosts && !postsLoadLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id; // mainPosts가 존재할때만 lastId를 생성
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    };
    window.addEventListener('scroll', handleOnscroll);
    return () => {
      window.removeEventListener('scroll', handleOnscroll);
    };
  }, [postsLoadLoading, hasPosts, mainPosts]);

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

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req && context.req.headers.cookie;
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    try {
      context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } catch (err) {
      console.error(err);
    }
  },
);

export default Home;
