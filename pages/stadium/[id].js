/* eslint-disable no-undef */
import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Router, { useRouter } from 'next/router';
import { Skeleton, Col, Row, Tabs, Button, message, Descriptions, Tag, Typography, Tooltip, Card, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Head from 'next/head';

import wrapper from '../../store/configureStore';
import StadiumComment from '../../components/StadiumComment';
import AppLayout2 from '../../components/AppLayout2';
import Feed from '../../components/Feed';
import { SELECT_STADIUM_REQUEST, TAKE_STADIUM_REQUEST } from '../../reducers/stadium';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { multipleSpecaility } from '../../util/columns';
import style from '../../SCSS/feedLayout.module.scss';
import stadiumMapStyles from '../../SCSS/stadium.module.scss';

const Stadium = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const lastScrollTop = useRef(0);
  const updownDirection = useRef(false);
  const { info, isSelected, isTakingStadium, isTakenStadium, takenStadiumErrorReason } = useSelector((state) => state.stadium);

  const moveToTeam = useCallback(() => {
    Router.push(`/team/${info.TeamId}`);
  }, [info]);

  const takeStadium = useCallback(() => {
    dispatch({
      type: TAKE_STADIUM_REQUEST,
      data: {
        id,
      },
    });
  }, [info.TeamId]);

  useEffect(() => {
    if (isTakenStadium) {
      notification.open({
        message: '점령이 완료되었습니다!',
        description: '실제 경기가 진행되지 않은 점령은 3일동안 지속됩니다. 점령경기를 통하여 점령 타이틀을 방어하세요!',
        duration: 0,
      });
    }
  }, [isTakenStadium]);

  useEffect(() => {
    if (takenStadiumErrorReason) {
      message.error(takenStadiumErrorReason);
    }
  }, [takenStadiumErrorReason]);

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
                <div class=${stadiumMapStyles.first}>
                  <div class=${stadiumMapStyles.outterImg}>
                    <div class=${stadiumMapStyles.innerImg}>
                      <img src="http://localhost:3065/${info?.Images[0]?.src}">
                    </div>
                  </div>
                  <div class=${stadiumMapStyles.triangle}>1</div>
                  <div class=${stadiumMapStyles.movietitle}>${info.Team?.title ?? '미점령중'}</div>
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
      <Head>
        <title>
          구장 | {info.title}
        </title>
        <meta name="description" content={info.description} />
        <meta property="og:title" content={`구장 | ${info.title}`} />
        <meta property="og:description" content={info.description} />
        <meta property="og:image" content={info.Images[0] ? info.Images[0].src : 'https://futchall.com/favicon.ico'} />
        <meta property="og:url" content={`https://futchall.com/team/${id}`} />
      </Head>
      <Row>
        <Col className={style.mainInfo} id="upDiv">
          <Card
            cover={(
              <div
                className={style.ImgContainer}
              >
                <img
                alt="Main image of Stadium"
                src={isSelected && `http://localhost:3065/${info.Images[0]?.src}`}
                style={{ maxHeight: '100%', width: 'auto', margin: '0 auto' }}
                />
              </div>
            )}
            className={style.cardDiv}
          >
            <Card.Meta
              title={(
                <Typography.Title level={3}>
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
                    {(isSelected && info.Team?.title) ? <a onClick={moveToTeam}>{info.Team.title}</a> : <Button type="primary" onClick={takeStadium} loading={isTakingStadium}>점령하기</Button>}
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
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: SELECT_STADIUM_REQUEST, data: context.params.id });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
    data: {
      where: 'stadium',
      id: context.params.id,
    },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Stadium;
