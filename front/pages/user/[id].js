import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ScreenUp from '../../components/ScreenUp';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { mainPosts, hasPosts, postsLoadLoading, retweetError } = useSelector(
    (state) => state.post,
  );

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
            type: LOAD_USER_POSTS_REQUEST,
            data: { id, lastId },
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
        <title>사용자 게시글 | NodeBird</title>
      </Head>
      <AppLayout>
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
    try {
      const cookie = context.req && context.req.headers.cookie;
      axios.defaults.headers.Cookie = '';
      if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: context.params.id,
      });
      context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: { id: context.params.id },
      });
      context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.error(error);
    }
  },
);

export default User;
