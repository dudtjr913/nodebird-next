import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import { LOAD_HASHTAG_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import ScreenUp from '../../components/ScreenUp';
import PostCard from '../../components/PostCard';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const HashTag = () => {
  const router = useRouter();
  const { name } = router.query;
  const { mainPosts, hashtagLoadLoading, hasPosts, retweetError } = useSelector(
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
        if (hasPosts && !hashtagLoadLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id; // mainPosts가 존재할때만 lastId를 생성
          dispatch({
            type: LOAD_HASHTAG_REQUEST,
            data: { name, lastId },
          });
        }
      }
    };
    window.addEventListener('scroll', handleOnscroll);
    return () => {
      window.removeEventListener('scroll', handleOnscroll);
    };
  }, [hashtagLoadLoading, hasPosts, mainPosts]);

  return (
    <>
      <Head>
        <title>#{name} | NodeBird</title>
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
        type: LOAD_HASHTAG_REQUEST,
        data: { name: context.params.name },
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

export default HashTag;
