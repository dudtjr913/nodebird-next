import React, { useCallback } from 'react';
import { UpSquareOutlined } from '@ant-design/icons';

const ScreenUp = () => {
  const handleOnScreenUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div
      onClick={handleOnScreenUp}
      role="presentation"
      style={{
        position: 'fixed',
        right: '30px',
        bottom: '30px',
        fontSize: '50px',
        zIndex: '2000',
        cursor: 'pointer',
      }}
    >
      <UpSquareOutlined />
    </div>
  );
};

export default ScreenUp;
