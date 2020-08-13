import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import Maps from '../components/Maps';
import StadiumList from '../components/StadiumList';
import StadiumInfo from '../components/StadiumInfo';
import { REFRESH_STADIUMLIST_REQUEST } from '../reducers/location';
import AppLayout from '../components/AppLayout';

const Stadia = () => {
  const dispatch = useDispatch();
  // const stadiumList = useSelector((state) => state.location.stadiumList, (left, right) => { const array1 = left.map((v) => v.id); const array2 = right.map((v) => v.id); if (array1.length === array2.length && array1.sort().every((value, index) => value === array2.sort()[index])) { return true; } return false; });
  const stadiumList = useSelector((state) => state.location.stadiumList);
  const [nowSelected, setNowSeleted] = useState(-1);

  const onChangeSelected = useCallback((req) => {
    setNowSeleted(req);
  }, []);
  useEffect(() => {
    // If users didn`t access BattleMap page from Index, to cover another access
    if (stadiumList.length === 0) {
      dispatch({
        type: REFRESH_STADIUMLIST_REQUEST,
        data: { latitude: 37.5795876, longitude: 126.9636324 },
      });
    }
  }, []);
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

export default Stadia;
