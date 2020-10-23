import React from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import ScreenUp from '../../components/ScreenUp';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import { LOAD_USER_REQUEST } from '../../reducers/user';

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>사용자 게시글 | NodeBird</title>
      </Head>
      <AppLayout>
        {user.nickname}
        <ScreenUp />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    try {
      context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: context.params.id,
      });
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.error(error);
    }
  },
);

export default User;
