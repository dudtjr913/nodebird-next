import React, { useEffect } from 'react';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_FOLLOWINGS_REQUEST,
  LOAD_MY_FOLLOWERS_REQUEST,
} from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      Router.replace('/');
    }
  }, [user]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_FOLLOWERS_REQUEST,
    });
  }, []);

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

export default Profile;
