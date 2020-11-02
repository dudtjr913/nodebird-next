import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { TO_BE_REMOVED_IMAGE } from '../reducers/post';

const PostEditImage = ({ images, postId }) => {
  const [copyImages, setCopyImages] = useState([...images]);
  const dispatch = useDispatch();
  const handleOnRemove = useCallback(
    (id) => () => {
      const remainedImage = copyImages.filter((v) => v.id !== id);
      setCopyImages(remainedImage);
      dispatch({
        type: TO_BE_REMOVED_IMAGE,
        id,
      });
    },
    [copyImages],
  );
  if (copyImages.length === 1) {
    return (
      <>
        <img
          style={{ maxHeight: '250px' }}
          src={`http://localhost:3065/${copyImages[0].src}`}
          alt={copyImages[0].src}
          role="presentation"
        />
        <div style={{ textAlign: 'center' }}>
          <CloseOutlined onClick={handleOnRemove(copyImages[0].id)} />
        </div>
      </>
    );
  }
  if (copyImages.length === 2) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '50%',
          }}
        >
          <img
            style={{ width: '100%', maxHeight: '250px' }}
            src={`http://localhost:3065/${copyImages[0].src}`}
            alt={copyImages[0].src}
            role="presentation"
          />
          <div style={{ textAlign: 'center' }}>
            <CloseOutlined onClick={handleOnRemove(copyImages[0].id)} />
          </div>
        </div>
        <div
          style={{
            width: '50%',
          }}
        >
          <img
            style={{ width: '100%', maxHeight: '250px' }}
            src={`http://localhost:3065/${copyImages[1].src}`}
            alt={copyImages[1].src}
            role="presentation"
          />
          <div style={{ textAlign: 'center' }}>
            <CloseOutlined onClick={handleOnRemove(copyImages[1].id)} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <ul style={{ listStyle: 'none', padding: '0px' }}>
        <li style={{ display: 'flex', flexFlow: 'wrap', alignItems: 'center' }}>
          {copyImages.map((v) => (
            <div key={v.src} style={{ width: '50%' }}>
              <img
                role="presentation"
                src={`http://localhost:3065/${v.src}`}
                style={{
                  width: '100%',
                  display: 'inline-block',
                  maxHeight: '250px',
                }}
                alt={v.src}
              />
              <div style={{ textAlign: 'center' }}>
                <CloseOutlined onClick={handleOnRemove(v.id)} />
              </div>
            </div>
          ))}
        </li>
      </ul>
    </>
  );
};

PostEditImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  postId: PropTypes.number.isRequired,
};

export default PostEditImage;
