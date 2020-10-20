import 'antd/dist/antd.css';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
// import withReduxSaga from 'next-redux-saga'; 버전이 높아지면서 withReduxSaga를 사용하지 않아도 되었음.

const NodeBird = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
    </Head>
    <Component />
  </>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird); // 이전에는 wrapper.withRedux(withReduxSaga(NodeBird))였음
