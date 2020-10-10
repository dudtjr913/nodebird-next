import React, { useEffect } from 'react';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>

      {user ? (
        <AppLayout>
          <NicknameEditForm />
          <FollowList data={user.Followings} header="팔로잉" />
          <FollowList data={user.Followers} header="팔로워" />{' '}
        </AppLayout>
      ) : (
        <AppLayout>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: '50px',
              fontSize: '30px',
            }}
          >
            로그인을 해주세요.
          </div>
        </AppLayout>
      )}
    </>
  );
};

export default Profile;
