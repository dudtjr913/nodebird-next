import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ nickname }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.post.mainPosts);
  const { user, followLoading, unfollowLoading } = useSelector(
    (state) => state.user,
  );
  const isFollowing = user.Followings.find((v) => v.nickname === nickname);
  const handleOnFollow = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: { nickname },
    });
  }, [isFollowing]);

  const handleOnUnfollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: { nickname },
    });
  }, [isFollowing]);

  return (
    <>
      {console.log(id)}
      {isFollowing ? (
        <Button
          loading={unfollowLoading}
          onClick={handleOnUnfollow}
          style={{ float: 'right' }}
        >
          언팔로우
        </Button>
      ) : (
        <Button
          loading={followLoading}
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
};

export default FollowButton;
