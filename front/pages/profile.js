import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  LOAD_MY_FOLLOWERS_REQUEST,
  LOAD_MY_FOLLOWINGS_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from '../reducers/user';
import wrapper from '../store/configureStore';
// import useSWR from 'swr';

/* const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data); */

const Profile = () => {
  const { me, hasMoreFollowers, hasMoreFollowings } = useSelector(
    (state) => state.user,
  );
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  const dispatch = useDispatch();

  /* const { data: followers, error: followerError } = useSWR(
    // swr은 next에서 만든 라이브러리로 최소한의 get, LOAD요청정도는 reducer에 상태를 만들지 않고도 가능하게 해주는 것임 또한, 이것은 리액트 훅이다.
    `http://localhost:3065/user/followers?offset=${followersOffset}`,
    fetcher,
  ); */

  useEffect(() => {
    if (!me) {
      Router.replace('/');
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_FOLLOWINGS_REQUEST,
      limit: followingsLimit,
    });
  }, [followingsLimit]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_FOLLOWERS_REQUEST,
      limit: followersLimit,
    });
  }, [followersLimit]);

  const followingsMore = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const followersMore = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      {me && (
        <AppLayout>
          <NicknameEditForm />
          <FollowList
            hasMore={hasMoreFollowings}
            moreData={followingsMore}
            data={me.Followings}
            header="팔로잉"
          />
          <FollowList
            hasMore={hasMoreFollowers}
            moreData={followersMore}
            data={me.Followers}
            header="팔로워"
          />
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
        type: LOAD_MY_FOLLOWERS_REQUEST,
      });
      context.store.dispatch({
        type: LOAD_MY_FOLLOWINGS_REQUEST,
      });
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } catch (error) {
      console.error(error);
    }
  },
);

export default Profile;
