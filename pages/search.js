import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, List } from 'antd';
import moment from 'moment';
import { END } from 'redux-saga';
import axios from 'axios';
import Link from 'next/link';

import { SEARCH_TEAMS_REQUEST } from '../reducers/team';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Search = () => {
  const { teamList, query, isSearched } = useSelector((state) => state.team);

  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <Typography.Title level={4}>"{query}"에 대한 검색 결과입니다.</Typography.Title>
          {
            isSearched && teamList[0] && (
            <List
              header={`게시글 검색 결과 ${teamList[0].length}건`}
              itemLayout="vertical"
              size="large"
              pagination={{ pageSize: 3 }}
              dataSource={teamList[0]}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={
                    item.src && (
                      <img
                        height="150"
                        alt="first post image"
                        src={`${item.src}`}
                      />
                    )
                  }
                >
                  <List.Item.Meta
                    title={<Link href={`/post/${item.id}`}><a>{item.nickname}님의 게시글</a></Link>}
                    description={moment(item.createdAt.toString()).locale('ko').fromNow()}
                  />
                  {item.content}
                </List.Item>
              )}
            />
            )
          }
          {
            isSearched && teamList[1] && (
            <List
              header={`구장 검색 결과 ${teamList[1].length}건`}
              itemLayout="vertical"
              size="large"
              pagination={{ pageSize: 3 }}
              dataSource={teamList[1]}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={
                    item.src && (
                      <img
                        height="150"
                        alt="first post image"
                        src={`${item.src}`}
                      />
                    )
                  }
                >
                  <List.Item.Meta
                    title={<Link href={`/stadium/${item.id}`}><a>{item.title}</a></Link>}
                    description={item.address}
                  />
                  {item.description}
                </List.Item>
              )}
            />
            )
          }
          {
            isSearched && teamList[2] && (
            <List
              header={`팀 검색 결과 ${teamList[2].length}건`}
              itemLayout="vertical"
              size="large"
              pagination={{ pageSize: 3 }}
              dataSource={teamList[2]}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={
                    item.src && (
                      <img
                        height="150"
                        alt="first post image"
                        src={`${item.src}`}
                      />
                    )
                  }
                >
                  <List.Item.Meta
                    title={<Link href={`/team/${item.id}`}><a>{item.title}</a></Link>}
                    description={item.location}
                  />
                  {item.description}
                </List.Item>
              )}
            />
            )
          }
        </Col>
      </Row>
    </AppLayout>
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
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: SEARCH_TEAMS_REQUEST, data: { query: context.query.q } });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Search;
