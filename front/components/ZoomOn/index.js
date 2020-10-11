import React, { useCallback, useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import {
  ZoomWrapper,
  HeaderWrapper,
  ButtonWrapper,
  GlobalSlick,
  SliderWrapper,
  ImageWrapper,
  Pages,
} from './styles';

const ZoomOn = ({ images, ZoomClose }) => {
  const [count, setCount] = useState(1);
  const ZoomInput = useRef();
  const handleOnKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      ZoomClose();
    }
  }, []);
  useEffect(() => {
    ZoomInput.current.focus();
  }, []);
  return (
    <ZoomWrapper onKeyDown={handleOnKeyDown}>
      <HeaderWrapper>
        <div>상세 이미지</div>
        <ButtonWrapper onClick={ZoomClose} />
      </HeaderWrapper>
      <GlobalSlick />
      <SliderWrapper>
        <Slider
          infinite
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          beforeChange={(current, next) => setCount(next + 1)}
        >
          {images.map((v) => (
            <ImageWrapper ref={ZoomInput} key={v.src}>
              <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
            </ImageWrapper>
          ))}
        </Slider>
        <Pages>{`${count} / ${images.length}`}</Pages>
      </SliderWrapper>
    </ZoomWrapper>
  );
};

ZoomOn.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  ZoomClose: PropTypes.func.isRequired,
};

export default ZoomOn;
