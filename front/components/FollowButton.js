import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ postId, userId }) => {
  const dispatch = useDispatch();
  const {
    user,
    followLoading,
    unfollowLoading,
    followingPostId,
    unfollowingPostId,
  } = useSelector((state) => state.user);
  const isFollowing = user.Followings.find((v) => v.id === userId);

  const handleOnFollow = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: { postId, userId },
    });
  }, [isFollowing]);

  const handleOnUnfollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: { postId, userId },
    });
  }, [isFollowing]);

  return (
    <>
      {isFollowing ? (
        <Button
          loading={unfollowLoading && unfollowingPostId === postId}
          onClick={handleOnUnfollow}
          style={{ float: 'right' }}
        >
          언팔로우
        </Button>
      ) : (
        <Button
          loading={followLoading && followingPostId === postId}
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
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FollowButton;
