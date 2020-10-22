import React, { useEffect } from 'react';
import Head from 'next/head';

import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_FOLLOWINGS_REQUEST,
  LOAD_MY_FOLLOWERS_REQUEST,
} from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      Router.replace('/');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      {user && (
        <AppLayout>
          <NicknameEditForm />
          <FollowList data={user.Followings} header="팔로잉" />
          <FollowList data={user.Followers} header="팔로워" />{' '}
        </AppLayout>
      )}
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
        type: LOAD_MY_FOLLOWINGS_REQUEST,
      });
      context.store.dispatch({
        type: LOAD_MY_FOLLOWERS_REQUEST,
      });
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.error(error);
    }
  },
);

export default Profile;
