import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Typography } from 'antd';
import { END } from 'redux-saga';
import axios from 'axios';

import { SEARCH_TEAMS_REQUEST } from '../reducers/team';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Search = () => {
  const { teamList, query } = useSelector((state) => state.team);
  console.log(teamList, query);
  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <Typography.Title level={4}>"{query}"에 대한 검색 결과입니다.</Typography.Title>
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: SEARCH_TEAMS_REQUEST, data: { query: context.query.q } });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Search;
