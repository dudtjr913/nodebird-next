import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ nickname, id }) => {
  const dispatch = useDispatch();
  const {
    user,
    followLoading,
    unfollowLoading,
    followingId,
    unfollowingId,
  } = useSelector((state) => state.user);
  const isFollowing = user.Followings.find((v) => v.id === id);
  const handleOnFollow = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: { nickname, id },
    });
  }, [isFollowing]);

  const handleOnUnfollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: { nickname, id },
    });
  }, [isFollowing]);

  return (
    <>
      {isFollowing ? (
        <Button
          loading={unfollowLoading && unfollowingId === id}
          onClick={handleOnUnfollow}
          style={{ float: 'right' }}
        >
          언팔로우
        </Button>
      ) : (
        <Button
          loading={followLoading && followingId === id}
          onClick={handleOnFollow}
          style={{ float: 'right' }}
        >
          팔로우
        </Button>
      )}
    </>
  );
};

FollowButton.propTypes = {
  nickname: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FollowButton;
