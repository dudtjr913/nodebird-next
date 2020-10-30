import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const PostEditImage = ({ images }) => {
  const copyImages = [...images];
  const handleOnRemove = useCallback(() => {
    console.log('remove');
  }, []);
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
          <CloseOutlined onClick={handleOnRemove} />
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
            <CloseOutlined onClick={handleOnRemove} />
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
            <CloseOutlined onClick={handleOnRemove} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <img
        role="presentation"
        src={`http://localhost:3065/${copyImages[0].src}`}
        style={{ width: '50%', display: 'inline-block', maxHeight: '250px' }}
        alt={copyImages[0].src}
      />
      <div
        role="presentation"
        style={{
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          maxHeight: '250px',
          verticalAlign: 'middle',
        }}
      >
        <PlusOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        <div style={{ fontSize: '20px', cursor: 'pointer' }}>
          {`${copyImages.length - 1}개의 사진 더보기`}
        </div>
      </div>
    </>
  );
};

PostEditImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostEditImage;
