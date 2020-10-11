import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const ZoomWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  text-align: center;
`;

export const HeaderWrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0px;
  font-size: 20px;

  & div {
    line-height: 50px;
    width: 100%;
    margin: 0;
    color: gray;
  }
`;

export const ButtonWrapper = styled(CloseOutlined)`
  position: absolute;
  right: 20px;
  color: gray;
`;

export const SliderWrapper = styled.div`
  background-color: #090909;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  place-content: center;
  user-select: none;
`;

export const ImageWrapper = styled.div`
  padding: 30px;
  text-align: center;
  & img {
    margin: auto;
    max-width: 90%;
  }
`;

export const Pages = styled.div`
  color: white;
`;

export const GlobalSlick = createGlobalStyle`
 .slick-slide{
    display:inline-block;
 }
`;
