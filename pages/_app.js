import 'antd/dist/antd.css';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const NodeBird = ({ Component }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
			</Head>
			<Component />
		</>
	);
};

NodeBird.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
