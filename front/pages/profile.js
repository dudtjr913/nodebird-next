import React from 'react';
import Head from 'next/head';

import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

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
