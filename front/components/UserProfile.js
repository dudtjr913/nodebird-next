import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { logOutLoading, me } = useSelector((state) => state.user);
  const LogOutForm = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          게시글
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followings">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0].toUpperCase()}</Avatar>}
        title={me.nickname}
      />
      <Button loading={logOutLoading} onClick={LogOutForm}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
