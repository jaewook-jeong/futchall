import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { END } from 'redux-saga';
import axios from 'axios';

import Maps from '../components/Maps';
import StadiumList from '../components/StadiumList';
import StadiumInfo from '../components/StadiumInfo';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import getLocation from '../util/getLocation';
import { SET_WHERE_USER } from '../reducers/location';

const Stadia = () => {
  // const stadiumList = useSelector((state) => state.location.stadiumList, (left, right) => { const array1 = left.map((v) => v.id); const array2 = right.map((v) => v.id); if (array1.length === array2.length && array1.sort().every((value, index) => value === array2.sort()[index])) { return true; } return false; });
  const stadiumList = useSelector((state) => state.location.stadiumList);
  const [nowSelected, setNowSeleted] = useState(-1);
  const dispatch = useDispatch();
  const onChangeSelected = useCallback((req) => {
    setNowSeleted(req);
  }, []);

  // useEffect(() => {
  //   async function whereAreYou() {
  //     const result = await getLocation();
  //     if (result[0] === 'success') {
  //       dispatch({
  //         type: SET_WHERE_USER,
  //         data: { latitude: result[2], longitude: result[3] },
  //       });
  //     }
  //   }
  //   whereAreYou();
  // }, []);
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
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Stadia;
