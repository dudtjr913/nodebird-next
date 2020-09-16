import React from 'react';

const PostImages = ({ images }) => {
	return (
		<img src={images[0].src} style={{ width: '100px', height: '100px' }} />
	);
};

export default PostImages;
