import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Col, Row, Typography } from 'antd';
import { END } from 'redux-saga';
import axios from 'axios';

import { LOAD_LIST_REQUEST } from '../../reducers/team';
import AppLayout from '../../components/AppLayout';
import { RankingColumns as columns } from '../../util/columns';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const Ranking = () => {
  // const { rankingList, isLoading } = useSelector((state) => state.team);
  const rankingList = [
    {
      title: '잔디FC',
      rank: 1,
      location: '서울',
      occupation: 3,
      recruit: 'Y',
      leader: 'everest88',
    },
    {
      title: 'FC벌',
      rank: 2,
      location: '서울',
      occupation: 1,
      recruit: 'N',
      leader: 'leese',
    },
  ];
  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <Typography.Title level={3}>
            구장깨기 순위
          </Typography.Title>
          <Table
            showHeader
            rowKey={(record) => record.id}
            columns={columns}
            scroll={{ x: 'max-content', scrollToFirstRowOnChange: true }}
            pagination={{ pageSize: 50 }}
            dataSource={rankingList}
            size="small"
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log('------------------------------------');
//   console.log("SSR start");
//   console.log('------------------------------------');
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.common.Authorization = '';
//   let token = '';
//   // if (context.req && cookie) {
//   //   if (cookie.indexOf(';') !== -1) {
//   //     const index = cookie.indexOf('RefreshToken');
//   //     token = cookie.slice(index + 13, cookie.indexOf(';', index));
//   //   } else {
//   //     token = cookie.slice(13);
//   //   }
//   //   if (token) {
//   //     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   //     context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
//   //   }
//   // }
//   context.store.dispatch({ type: LOAD_LIST_REQUEST });
//   context.store.dispatch(END);
//   console.log('------------------------------------');
//   console.log("SSR end");
//   console.log('------------------------------------');
//   await context.store.sagaTask.toPromise();
// });

export default Ranking;
