/* eslint-disable no-undef */
import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Router, { useRouter } from 'next/router';
import { Skeleton, Col, Row, Tabs, Button, message, Descriptions, Tag, Typography, Tooltip, Card, notification, List, Empty } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

import wrapper from '../../store/configureStore';
import StadiumComment from '../../components/StadiumComment';
import AppLayout2 from '../../components/AppLayout2';
import Feed from '../../components/Feed';
import { SELECT_STADIUM_REQUEST, TAKE_STADIUM_REQUEST } from '../../reducers/stadium';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { multipleSpecaility } from '../../util/columns';
import style from '../../SCSS/feedLayout.module.scss';
import stadiumMapStyles from '../../SCSS/stadium.module.scss';
import MatchCard from '../../components/MatchCard';
import { backUrl } from '../../config/config';

const fetcher = (url) => url.substr(-1, 1) !== '1' && axios.get(url).then((result) => result.data);

const Stadium = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const lastScrollTop = useRef(0);
  const [tabKey, setTabKey] = useState('1');
  const { info, isSelected, isTakingStadium, isTakenStadium, takenStadiumErrorReason } = useSelector((state) => state.stadium);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (document.cookie.includes('Visited')) {
      let visitedArr;
      let visitedIndex;
      if (document.cookie.includes(';')) {
        // cookie more than 1
        const startIndex = document.cookie.indexOf("Visited")+8;
        visitedArr = document.cookie.substr(startIndex, document.cookie.indexOf(';', startIndex)).split(',');
      } else {
        // cookie only one
        visitedArr = document.cookie.substring(8).split(',');
      }
      visitedIndex = visitedArr.indexOf(id);
      if (visitedIndex !== -1) {
        visitedArr.splice(visitedIndex, 1);
      }
      visitedArr.push(id);
      document.cookie =  `Visited=${visitedArr.join()}; path=/; domain=.futchall.com`;
    } else {
      document.cookie = `Visited=${id}; path=/; domain=.futchall.com`;
    }
  }, []);
  const { data, error } = useSWR(`${backUrl}/stadium/${id}/${tabKey}`, fetcher, { revalidateOnFocus: false });

  const moveToTeam = useCallback(() => {
    Router.push(`/team/${info.TeamId}`);
  }, [info]);

  const takeStadium = useCallback(() => {
    if (isLoggedIn) {
      dispatch({
        type: TAKE_STADIUM_REQUEST,
        data: {
          id,
        },
        token,
      });
    } else {
      message.warn('먼저 로그인을 해주세요.');
    }
  }, [info, isLoggedIn]);

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
                      <img src="${info?.Images[0]?.src}">
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
  }, [info]);

  useEffect(() => {
    function onScroll() {
      const st = window.pageYOffset; // 문서가 수직으로 얼마나 스크롤 되었는가?
      const targetDiv = document.getElementById('facebookFlow');
      const fakeDiv = document.getElementById('facebookFake');
      const upDivHeight = document.getElementById('upDiv').offsetHeight + 66; // 위에정보 높이
      const vh = window.innerHeight; // 창 높이
      const vw = window.innerWidth; // 창 너비
      if (vw > 768 && targetDiv.offsetHeight + 76 > vh) {
        if (st >= lastScrollTop.current) {
          // down
          fakeDiv.style.cssText = 'height: 0px';
          targetDiv.style.cssText = `top: ${vh - targetDiv.offsetHeight - 18}px`;
        } else {
          // up
          if (upDivHeight + targetDiv.offsetHeight <= st + vh) {
            // 왼쪽 정보의 총 높이값 보다 스크롤이 더 내려갔을 떼
            if (fakeDiv.offsetHeight === 0) {
              fakeDiv.style.cssText = `height: ${st + vh - upDivHeight - targetDiv.offsetHeight}px`;
            }
          } else {
            if (fakeDiv.offsetHeight === 0) {
              fakeDiv.style.cssText = 'height: 0px';
            }
          }
          targetDiv.style.cssText = `bottom: ${vh - targetDiv.offsetHeight - 80}px`;
        }
        lastScrollTop.current = st;
      } else {
        targetDiv.style.cssText = 'top: 76px';
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [info]);

  return (
    <AppLayout2>
      {
        isSelected && (
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
        )
      }
      <Row>
        <Col className={style.mainInfo} id="upDiv">
          <Card
            cover={(
              <div
                className={style.ImgContainer}
              >
                <img
                alt="Main image of Stadium"
                src={isSelected && `${info.Images[0]?.src}`}
                style={{ height: 'auto', width: 'auto', margin: '0 auto', maxHeight: '400px', maxWidth: '100%' }}
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
            <Tabs
              tabBarExtraContent={<Button onClick={() => { message.warn('준비중입니다.'); }} shape="round"><QuestionCircleOutlined />정보수정</Button>}
              defaultActiveKey={tabKey}
              onChange={(key) => setTabKey(key)}
            >
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
                    {(isSelected && info.Team?.title) ? <Link href={`/team/${info.TeamId}`} prefetch={false}><a>{info.Team.title}</a></Link> : <Button type="primary" onClick={takeStadium} loading={isTakingStadium}>점령하기</Button>}
                  </Descriptions.Item>
                  <Descriptions.Item label={<>유효기간 <Tooltip title="점령 후 도전을 받지 않을 시 유지되는 기간입니다."><QuestionCircleOutlined /></Tooltip></>} span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && <Tooltip title={info.valid}>{info.valid?.slice(0, 10)}</Tooltip>}
                  </Descriptions.Item>
                </Descriptions>
                <div className={style.mapContainer}>
                  <div id="stadiumAddress" className={style.occupyMap} />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="경기기록" key="2">
                {
                  !data && !error && <Skeleton active loading />
                }
                {
                  tabKey === '2'
                  && (
                    <List
                      grid={{
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 2,
                      }}
                      pagination={{ pageSize: 6 }}
                      rowKey={(item) => item.id}
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <MatchCard match={item} />
                        </List.Item>
                      )}
                    />
                  )
                }
              </Tabs.TabPane>
              <Tabs.TabPane tab="사진" key="3">
                {
                  !data && !error && <Skeleton active loading />
                }
                <Row justify="space-around" gutter={[5,10]}>
                  {
                    (tabKey === '3' && data?.length)
                      ? (
                        data.map((v) => (
                          <Col xs={{ span: 11 }} sm={{ span: 11 }} md={{ span: 11 }} xl={{ span: 8 }} key={v.Images[0].id} className={style.photoBrick}>
                            <div className={style.thumbnail}>
                              <div className={style.centered}>
                                <img src={`${v.Images[0].src}`} />
                              </div>
                            </div>
                          </Col>
                        ))
                      )
                      : <Empty />
                  }
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="후기" key="4">
                <Skeleton active loading />
                <StadiumComment />
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
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    }
  }
  if (!isNaN(context.params.id)) {
    context.store.dispatch({ type: SELECT_STADIUM_REQUEST, data: context.params.id });
  }
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Stadium;
