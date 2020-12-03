import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Router from 'next/router'
import 'antd/dist/antd.css';

import * as gtag from '../util/gtag';
import wrapper from '../store/configureStore';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

const FutChall = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>FutChall: 팀, 구장, 랭킹을 모두 한 곳에서</title>
      <meta name="description" content="풋챌과 함께 풋살팀을 생성하고 지역 구장을 등록하여 구장을 점령하세요! 많은 구장을 점령하여 순위를 올려보세요!" />
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.6.2/antd.min.css" />
      <link rel="icon" type="image/png" href={`/favicon.png`} />
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=60712c2e792d545d1241f9c9bc3a1f28&libraries=clusterer,services" />
    </Head>
    <Component {...pageProps} />
  </>
);

FutChall.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(FutChall);
