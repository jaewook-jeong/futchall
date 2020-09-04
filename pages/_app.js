import React from 'react';
import Head from 'next/head';
import withReduxSaga from 'next-redux-saga';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const FutChall = ({ Component }) => (
  <>
    <Head>
      <title>FutChall</title>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.6.2/antd.min.css" />
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=60712c2e792d545d1241f9c9bc3a1f28&libraries=clusterer,services" />
    </Head>
    <Component />
  </>
);

FutChall.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(FutChall));
