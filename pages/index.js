import React, { useCallback } from 'react';
import Router from 'next/router';
import { Button, Col, Row, Input, Statistic, Divider } from 'antd';
import { SearchOutlined, LikeOutlined, ArrowUpOutlined, TrophyTwoTone } from '@ant-design/icons';
import {  useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '../store/configureStore';

const Home = () => {
  const { isChangingLocation } = useSelector((state) => state.location);

  const onSearch = useCallback((e) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(e, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        Router.push(`/stadia?lat=${result[0].y}&lng=${result[0].x}&loc=${e}`);
      }
    });
  }, []);

  const onClickGPS = useCallback(() => {
    Router.push('/stadia');
  }, []);
  return (
    <Row style={{ minHeight: '100vh', textAlign: 'center' }} align={"middle"}>
      <Col md={{ span: 16, offset: 4 }} sm={{span: 18, offset: 3}} xs={{ span: 20, offset: 2 }}>
          <img src="/index.png" alt="futchall icon"/>
      </Col>
      <Col md={{ span: 16, offset: 4 }} sm={{span: 18, offset: 3}} xs={{ span: 20, offset: 2 }}>
        <Row gutter={[0,20]}>
          <Divider orientation="left"><Button icon={<TrophyTwoTone twoToneColor="#fbd71f" />} type="text">어제의 기록</Button></Divider>
          <Col md={{ span: 6, offset: 2 }} xs={{ span: 18, offset: 3 }} >
            <Statistic title="최다 구장 점령 수" value={7} prefix={<LikeOutlined />}></Statistic>
          </Col>
          <Col md={{ span: 6, offset: 1 }} xs={{ span: 18, offset: 3 }}>
            <Statistic title="새로등록된 구장 수" value={7} valueStyle={{ color: "#40a9ff" }} prefix={<ArrowUpOutlined />} suffix="개"></Statistic>
          </Col>
          <Col md={{ span: 6, offset: 1 }} xs={{ span: 18, offset: 3 }}>
            <Statistic title="최다 점령 팀" value={"잔디FC"} valueStyle={{ color: '#3f8600' }}></Statistic>
          </Col>
        </Row>
      </Col>
      <Col md={{ span: 12, offset: 6 }} sm={{span: 14, offset: 5}} xs={{ span: 20, offset: 2 }}>
        <Input.Search size="large" placeholder="활동지역을 검색해보세요" onSearch={onSearch} enterButton />
      </Col>
      <Col md={{ span: 16, offset: 4 }} sm={{span: 18, offset: 3}} xs={{ span: 20, offset: 2 }}>
        <Row gutter={[10, 10]}>
          <Col span={24} >
            <Button type="primary" icon={<SearchOutlined />} size="large" shape="round" onClick={onClickGPS} loading={isChangingLocation}>지도로 구장 둘러보기</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Authorization = '';
  let token = '';
  // TODO 첫페이지 데이터 가져와야 해
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
