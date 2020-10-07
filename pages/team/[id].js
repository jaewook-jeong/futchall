/* eslint-disable no-undef */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { Skeleton, Col, Row, Tabs, Button, Descriptions, Typography, Table, Card, Space, Tag, List } from 'antd';
import { LoadingOutlined, ToolOutlined } from '@ant-design/icons';
import axios from 'axios';
import useSWR from 'swr';
import Head from 'next/head';

import AppLayout2 from '../../components/AppLayout2';
import Feed from '../../components/Feed';
import { SELECT_TEAM_REQUEST } from '../../reducers/team';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { JOIN_IN_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import style from '../../SCSS/feedLayout.module.scss';
import { teamMemberColumns as memberColumns, teamRecordColumns as recordColumns } from '../../util/columns';
import wrapper from '../../store/configureStore';
import TeamManagement from '../../components/TeamManagement';
import MatchCard from '../../components/MatchCard';

const fetcher = (url) => url.substr(-1, 1) !== '1' && axios.get(url, { withCredentials: true }).then((result) => result.data);

const Team = () => {
  const router = useRouter();
  const { id } = router.query;
  const { info, isSelected } = useSelector((state) => state.team);
  const { me, isLoggedIn, isJoinnigIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [managementVisible, setManagementVsible] = useState(false);
  const [tabKey, setTabKey] = useState('1');
  const lastScrollTop = useRef(0);
  const updownDirection = useRef(false);

  const { data, error } = useSWR(`http://localhost:3065/team/${id}/${tabKey}`, fetcher);

  const joinInTeam = useCallback(() => {
    dispatch({
      type: JOIN_IN_REQUEST,
      data: {
        id,
      },
    });
  }, []);
  const onClickManagement = useCallback(() => {
    setManagementVsible(true);
  }, [me]);
  useEffect(() => {
    if (isSelected && info.Stadia.length !== 0) {
      const points = info.Stadia.map((obj) => new kakao.maps.LatLng(obj.lat, obj.lng));
      const options = {
        center: new kakao.maps.LatLng(38, 127.30),
        level: 5,
      };
      const map = new kakao.maps.Map(document.getElementById('stadiumAddress'), options);
      map.setDraggable(false);
      map.setZoomable(false);
      const bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < points.length; i += 1) {
        // need index for getting req, so don't use forEach etc.
        const marker = new kakao.maps.Marker({ position: points[i], clickable: true });
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', () => {
          Router.push(`/stadium/${info.Stadia[i].id}`);
        });
        bounds.extend(points[i]);
      }
      map.relayout();
      map.setBounds(bounds);
    }
  }, [info]);

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
  }, [info]);

  return (
    <AppLayout2>
      {
        isSelected && (
        <Head>
          <title>
            팀 | {info.title}
          </title>
          <meta name="description" content={info.description} />
          <meta property="og:title" content={`팀 | ${info.title}`} />
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
                  alt="Main image of Team"
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
            <Tabs
              tabBarExtraContent={
                isSelected && isLoggedIn && (info.id === me?.LeaderId)
                && <Button onClick={onClickManagement} shape="round"><ToolOutlined />팀 관리</Button>
              }
              defaultActiveKey={tabKey}
              onChange={(key) => setTabKey(key)}
            >
              <Tabs.TabPane tab="상세정보" key="1">
                <Descriptions
                  column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                  bordered
                  title={isSelected && info.title}
                  size="middle"
                >
                  <Descriptions.Item label="활동 지역" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && info.location}
                  </Descriptions.Item>
                  <Descriptions.Item label="모임 시간" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    {isSelected && info.time}
                  </Descriptions.Item>
                  <Descriptions.Item label="모집 여부" span={2}>
                    <Skeleton loading={!isSelected} active paragraph={false} />
                    <Space size="middle">
                      {isSelected && info.recruit}
                      {isSelected && isLoggedIn && info.recruit === 'Y' && !me?.TeamId && !me?.JoinInId && <Button type="primary" shape="round" onClick={joinInTeam} size="small" loading={isJoinnigIn}>팀 가입 하기</Button>}
                      {isSelected && isLoggedIn && me?.JoinInId === info.id && <Tag>가입 대기중</Tag> }
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
                {
                  isSelected && info.Stadia.length !== 0 && (
                    <div className={style.mapContainer}>
                      <div id="stadiumAddress" className={style.occupyMap} />
                    </div>
                  )
                }
              </Tabs.TabPane>
              <Tabs.TabPane tab="선수 명단" key="2">
                {
                  !data && !error && <Skeleton active loading />
                }
                {
                  tabKey === '2'
                  && (
                    <Table
                      showHeader
                      tableLayout="fixed"
                      columns={memberColumns}
                      pagination={{ pageSize: 10 }}
                      scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, y: 550 }}
                      dataSource={data}
                      rowKey={(member) => member.id}
                    />
                  )
                }
              </Tabs.TabPane>
              <Tabs.TabPane tab="전적" key="3">
                {
                  !data && !error && <Skeleton active loading />
                }
                {/* {
                  tabKey === '3'
                  && (
                    <Table
                      showHeader
                      columns={recordColumns}
                      dataSource={data}
                      rowKey={(v) => v.id}
                    />
                  )
                } */}
                {
                  tabKey === '3'
                  && (
                    <List
                      grid={{
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 2,
                        xxl: 3,
                      }}
                      pagination
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
              <Tabs.TabPane tab="사진" key="4">
                {
                  !data && !error && <Skeleton active loading />
                }
                <Row justify="space-around">
                  {
                    tabKey === '4' && data
                    && (
                      data.map((v) => <Col xs={{ span: 22 }} sm={{ span: 12 }} md={{ span: 8 }} key={v.Images[0].id} className={style.photoBrick}><div className={style.thumbnail}><div className={style.centered}><img src={`http://localhost:3065/${v.Images[0].src}`} /></div></div></Col>)
                    )
                  }
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 13, offset: 1 }} className={style.postWall}>
          <Feed where="team" req={id} />
        </Col>
      </Row>
      {
        managementVisible && <TeamManagement setVisible={setManagementVsible} teamId={id} visible={managementVisible} />
      }
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
  context.store.dispatch({ type: SELECT_TEAM_REQUEST, data: { id: context.params.id } });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
    data: {
      where: 'team',
      id: context.params.id,
    },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Team;
