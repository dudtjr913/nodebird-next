import React from 'react';
import { UpSquareOutlined } from '@ant-design/icons';
import { element } from 'prop-types';

const ScreenUp = () => (
  <div
    style={{
      position: 'fixed',
      right: '30px',
      bottom: '30px',
      fontSize: '50px',
    }}
  >
    <UpSquareOutlined />
  </div>
);

export default ScreenUp;
