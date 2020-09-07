/* eslint-disable no-undef */
import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Router, { useRouter } from 'next/router';
import { Skeleton, Col, Row, Tabs, Button, message, Descriptions, Tag, Typography, Tooltip, Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import StadiumComment from '../../components/StadiumComment';
import { SELECT_STADIUM_REQUEST } from '../../reducers/stadium';
import stadiumMapStyles from '../../SCSS/stadium.module.scss';
import AppLayout2 from '../../components/AppLayout2';
import Feed from '../../components/Feed';
import style from '../../SCSS/feedLayout.module.scss';
import { multipleSpecaility } from '../../util/columns';
import wrapper from '../../store/configureStore';

const Stadium = () => {
  const router = useRouter();
  const { id } = router.query;
  const lastScrollTop = useRef(0);
  const updownDirection = useRef(false);
  const { info, isSelected } = useSelector((state) => state.stadium, (left, right) => { if (left.info.id === right.info.id) { return true; } return false; });

  const moveToTeam = useCallback(() => {
    Router.push(`/team/${info.teamInfo}`);
  }, [info]);

  useEffect(() => {
    if (isSelected) {
      const options = {
        center: new kakao.maps.LatLng(info.lat, info.lng),
        level: 4,
      };
      const map = new kakao.maps.Map(document.getElementById('stadiumAddress'), options);
      map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
      const marker = new kakao.maps.Marker(
        {
          map,
          position: new kakao.maps.LatLng(info.lat, info.lng),
        },
      );
      const overlayFrame = `<div class=${stadiumMapStyles.overlaybox}>
                <div class=${stadiumMapStyles.boxtitle} id="whatShouldIDo">구장 점령 팀</div>
                <div class=${stadiumMapStyles.first} >
                    <img src=${info?.Images[0]?.src}>
                    <div class=${stadiumMapStyles.triangle}>1</div>
                    <div class=${stadiumMapStyles.movietitle}>${info.Team.title}</div>
                </div>
            </div>`;
      const customOverlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: overlayFrame,
        xAnchor: 0.5,
        yAnchor: 1.3,
      });
      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
      // 오버레이 클릭시 팀으로 이동하고 싶은데 위에 overlayFrame에 그대로 넣으면 대부분의 방식에서 "function" 이런식으로 해석되어 버림
      document.getElementById('whatShouldIDo').onclick = moveToTeam;
    }
  }, [isSelected]);
  useEffect(() => {
    function onScroll() {
      const st = window.pageYOffset;
      const targetDiv = document.getElementById('facebookFlow');
      const fakeDiv = document.getElementById('facebookFake');
      const upDivHeight = document.getElementById('upDiv').offsetHeight + 66;
      const vh = window.innerHeight;
      if (st <= upDivHeight) {
        fakeDiv.style.cssText = 'height: 0px';
        updownDirection.current = false;
      }

      if (st > lastScrollTop.current) {
        // down
        targetDiv.style.cssText = `top: ${vh - targetDiv.offsetHeight - 10}px`;
        if (updownDirection.current && st > upDivHeight) {
          fakeDiv.style.cssText = `height: ${st - targetDiv.offsetHeight}px`;
          updownDirection.current = false;
        }
      } else if (st < lastScrollTop.current) {
        // up
        targetDiv.style.cssText = `bottom: ${vh - targetDiv.offsetHeight - 70}px`;
        if (!updownDirection.current) {
          fakeDiv.style.cssText = `height: ${st}px`;
          updownDirection.current = true;
        }
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <AppLayout2>
      <Row>
        <Col className={style.mainInfo} id="upDiv">
          <Card
            cover={(
              <div
                style={{ width: '100%', backgroundColor: '#ccc', opacity: '0.3' }}
              >
                <img
                alt="Main image of Stadium"
                src="https://via.placeholder.com/500x300/808080"
                style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: '100%', margin: '0 auto' }}
                />
              </div>
            )}
            className={style.cardDiv}
          >
            <Card.Meta
              title={(
                <Typography.Title level={3} copyable={isSelected && { text: window.location.pathname }}>
                  <Skeleton loading={!isSelected} active paragraph={false} />
                  {isSelected && info.title}
                </Typography.Title>
                )}
              description={isSelected && info.description}
              className={style.stickyTitle}
            />
          </Card>
        </Col>
      </Row>
      <Row className={style.flowInfo}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }}>
          <div id="facebookFake" />
          <div className={style.fixedInfo} id="facebookFlow">
            <Tabs tabBarExtraContent={<Button onClick={() => { message.warn('준비중입니다.'); }} shape="round"><QuestionCircleOutlined />정보수정</Button>}>
              <Tabs.TabPane tab="상세정보" key="1">
                <Descriptions
                  column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                  bordered
                  size="small"
                >
                  <Descriptions.Item label="주소" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && info.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="사용시간" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && info.time}
                  </Descriptions.Item>
                  <Descriptions.Item label="라이트 여부" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && info.light}
                  </Descriptions.Item>
                  <Descriptions.Item label="특징" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && info.special.split(',').map((c) => (<Tag key={c}>#{multipleSpecaility[c]}</Tag>))}
                  </Descriptions.Item>
                  <Descriptions.Item label="점령 팀" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && <a onClick={moveToTeam}>{info.team}</a>}
                  </Descriptions.Item>
                  <Descriptions.Item label={<>유효기간 <Tooltip title="점령 후 도전을 받지 않을 시 유지되는 기간입니다."><QuestionCircleOutlined /></Tooltip></>} span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && info.valid}
                  </Descriptions.Item>
                </Descriptions>
                <div className={style.mapContainer}>
                  <div id="stadiumAddress" className={style.occupyMap} />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="후기" key="2">
                <Skeleton active loading={!isSelected} />
                {isSelected && <StadiumComment />}
              </Tabs.TabPane>
              <Tabs.TabPane tab="사진" key="3">
                <Skeleton active />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 13, offset: 1 }}
          className={style.postWall}
        >
          <Feed where="stadium" req={id} />
        </Col>
      </Row>
    </AppLayout2>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({ type: SELECT_STADIUM_REQUEST, data: { id } });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Stadium;
