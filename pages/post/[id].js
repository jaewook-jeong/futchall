import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import AppLayout2 from '../../components/AppLayout2';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { SELECT_POST_REQUEST } from '../../reducers/post';
import PostComponent from '../../components/Post';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { post, selectPostDone } = useSelector((state) => state.post);
  return (
    <AppLayout2>
      {
        selectPostDone && (
        <Head>
          <title>
            {post.User.nickname}의 게시글
          </title>
          <meta name="description" content={post.content} />
          <meta property="og:title" content={`${post.User.nickname}의 게시글`} />
          <meta property="og:description" content={post.content} />
          <meta property="og:image" content={post.Images[0] ? post.Images[0].src : 'https://futchall.com/favicon.ico'} />
          <meta property="og:url" content={`https://futchall.com/post/${id}`} />
        </Head>
        )
      }
      <Row style={{ paddingTop: '10px' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, offset: 6 }}>
          <PostComponent data={post} key={post.id} />
        </Col>
      </Row>
    </AppLayout2>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Authorization = '';
  let token = '';
  if (context.req && cookie) {
    if (cookie.indexOf(';') !== -1) {
      const index = cookie.indexOf('RefreshToken');
      token = cookie.slice(index + 13, cookie.indexOf(';', index));
    } else {
      token = cookie.slice(13);
    }
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    }
  }
  context.store.dispatch({
    type: SELECT_POST_REQUEST,
    data: {
      id: context.params.id,
    },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
