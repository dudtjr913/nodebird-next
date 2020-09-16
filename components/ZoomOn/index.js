import React, { useCallback } from 'react';
import Slider from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const ZoomWrapper = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	text-align: center;
`;

const HeaderWrapper = styled.header`
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

const ButtonWrapper = styled(CloseOutlined)`
	position: absolute;
	right: 5px;
	color: gray;
`;

const SliderWrapper = styled.div`
	background-color: #090909;
	height: calc(100% - 50px);
`;

const ImageWrapper = styled.div`
	padding: 30px;
	text-align: center;
	& img {
		margin: auto;
		max-height: 700px;
	}
`;

const GlobalSlick = createGlobalStyle`
 .slick-slide{
	 display:inline-block;
 }
`;

const ZoomOn = ({ images, ZoomClose }) => {
	return (
		<ZoomWrapper>
			<HeaderWrapper>
				<div>상세 이미지</div>
				<ButtonWrapper onClick={ZoomClose}></ButtonWrapper>
			</HeaderWrapper>
			<GlobalSlick />
			<SliderWrapper>
				<div>
					<Slider
						infinite={true}
						slidesToShow={1}
						slidesToScroll={1}
						arrows={false}>
						{images.map((v) => (
							<ImageWrapper key={v.src}>
								<img src={v.src} alt={v.src} />
							</ImageWrapper>
						))}
					</Slider>
				</div>
			</SliderWrapper>
		</ZoomWrapper>
	);
};

export default ZoomOn;
