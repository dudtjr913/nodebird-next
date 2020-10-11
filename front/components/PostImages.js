import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ZoomOn from './ZoomOn';

const PostImages = ({ images }) => {
  const [zoom, setZoom] = useState(false);
  const ZoomOpen = useCallback(() => {
    setZoom(true);
  }, []);
  const ZoomClose = useCallback(() => {
    setZoom(false);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img
          style={{ maxHeight: '250px' }}
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={ZoomOpen}
          role="presentation"
        />
        {zoom && <ZoomOn images={images} ZoomClose={ZoomClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          style={{ width: '50%', display: 'inline-block', maxHeight: '250px' }}
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={ZoomOpen}
          role="presentation"
        />
        <img
          style={{ width: '50%', display: 'inline-block', maxHeight: '250px' }}
          src={`http://localhost:3065/${images[1].src}`}
          alt={images[1].src}
          onClick={ZoomOpen}
          role="presentation"
        />
        {zoom && <ZoomOn images={images} ZoomClose={ZoomClose} />}
      </>
    );
  }
  return (
    <>
      <img
        onClick={ZoomOpen}
        role="presentation"
        src={`http://localhost:3065/${images[0].src}`}
        style={{ width: '50%', display: 'inline-block', maxHeight: '250px' }}
        alt={images[0].src}
      />
      <div
        onClick={ZoomOpen}
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
          {`${images.length - 1}개의 사진 더보기`}
        </div>
      </div>
      {zoom && <ZoomOn images={images} ZoomClose={ZoomClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
