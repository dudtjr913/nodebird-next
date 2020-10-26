import React, { useCallback } from 'react';
import { List, Comment, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import { REMOVE_RECOMMENT_REQUEST } from '../reducers/post';

const ReComment = ({ comments }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const removeReComment = useCallback(
    (reCommentId) => () => {
      const reConfirm = window.confirm('정말로 답글을 삭제하시겠습니까?');
      if (!reConfirm) {
        return null;
      }
      return dispatch({
        type: REMOVE_RECOMMENT_REQUEST,
        reCommentId,
      });
    },
    [],
  );
  return (
    <List
      style={{ width: '90%', margin: 'auto' }}
      header={`${comments.ReComments.length}개의 답글`}
      itemLayout="horizontal"
      dataSource={comments.ReComments}
      renderItem={(ReComments) => (
        <li>
          <Comment
            actions={[
              me && me.id === ReComments.User.id && (
                <span
                  onClick={removeReComment(ReComments.id)}
                  role="presentation"
                  key="remove-recomment"
                >
                  삭제
                </span>
              ),
            ]}
            author={ReComments.User.nickname}
            avatar={
              <Link href={`/user/${ReComments.User.id}`}>
                <a>
                  <Avatar>{ReComments.User.nickname[0].toUpperCase()}</Avatar>
                </a>
              </Link>
            }
            content={ReComments.content}
            datetime={<span>{moment(ReComments.createdAt).fromNow()}</span>}
          />
        </li>
      )}
    />
  );
};

ReComment.propTypes = {
  comments: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    User: PropTypes.object.isRequired,
    ReComments: PropTypes.arrayOf(
      PropTypes.shape({
        User: PropTypes.object.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ReComment;
