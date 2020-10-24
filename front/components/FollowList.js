import React, { useMemo, useCallback } from 'react';
import { List, Card, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_MY_FOLLOWER_REQUEST } from '../reducers/user';

const FollowList = ({ data, header, moreData, hasMore }) => {
  const dispatch = useDispatch();
  const grid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }));
  const liststyle = useMemo(() => ({ marginBottom: 20, marginTop: 10 }));
  const divStyle = useMemo(() => ({ textAlign: 'center', margin: '10px 0' }));

  const handleOnRemoveFollow = useCallback(
    (userId) => () => {
      if (header === '팔로잉') {
        dispatch({
          type: UNFOLLOW_REQUEST,
          data: { userId },
        });
      }
      if (header === '팔로워') {
        dispatch({
          type: REMOVE_MY_FOLLOWER_REQUEST,
          data: { userId },
        });
      }
    },
    [],
  );

  return (
    <>
      <List
        style={liststyle}
        grid={grid}
        size="small"
        header={header}
        loadMore={
          hasMore && (
            <div style={divStyle}>
              <Button onClick={moreData}>더 보기</Button>
            </div>
          )
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              actions={[
                <StopOutlined
                  onClick={handleOnRemoveFollow(item.id)}
                  key="stop"
                />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  moreData: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default FollowList;
