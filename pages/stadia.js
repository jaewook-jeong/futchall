import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { END } from 'redux-saga';
import axios from 'axios';

import Maps from '../components/Maps';
import StadiumList from '../components/StadiumList';
import StadiumInfo from '../components/StadiumInfo';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Stadia = () => {
  const stadiumList = useSelector((state) => state.location.stadiumList);
  const [nowSelected, setNowSeleted] = useState(-1);
  const onChangeSelected = useCallback((req) => {
    setNowSeleted(req);
  }, []);
  useEffect(() => {
    setNowSeleted(-1);
  }, [stadiumList]);
  return (
    <AppLayout>
      <div>
        <Row gutter={[20, 16]}>

          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 13, offset: 2 }} xxl={{ offset: 4, span: 12 }}>
            {/* 지도 */}
            <Maps list={stadiumList} onChangeSelected={onChangeSelected} nowSelected={nowSelected} />
          </Col>

          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 7, offset: 0 }} xxl={{ span: 4 }}>
            {/* 리스트 */}
            <StadiumList list={stadiumList} onChangeSelected={onChangeSelected} nowSelected={nowSelected} />
          </Col>

          {nowSelected !== -1
            && (
            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }} xxl={{ span: 16, offset: 4 }}>
              <StadiumInfo list={stadiumList} nowSelected={nowSelected} />
            </Col>
            )}

        </Row>
      </div>
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
      token = cookie.indexOf(';', index) !== -1 ? cookie.slice(index + 13, cookie.indexOf(';', index)) : cookie.slice(index + 13);
    } else {
      token = cookie.slice(13);
    }
    if (token) {
      axios.defaults.headers.Cookie = `RefreshToken=${token}`;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    }
  }
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Stadia;
