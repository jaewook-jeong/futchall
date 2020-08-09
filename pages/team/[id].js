/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Col, Row, Tabs, Button, message, Descriptions, Typography, Table, Tag, Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { SELECT_TEAM_REQUEST } from '../../reducers/team';
import AppLayout2 from '../../components/AppLayout2';
import Feed from '../../components/Feed';
import style from '../../SCSS/feedLayout.module.scss';
import { teamMemberColumns as memberColumns, teamRecordColumns as recordColumns } from '../../util/columns';

const Stadium = () => {
  const router = useRouter();
  const { id } = router.query;
  const { info, isSelected, memberList } = useSelector((state) => state.team, (left, right) => { if (left.info.req === right.info.req) { return true; } return false; });
  const { me, isLoggedIn } = useSelector((state) => state.user, (left, right) => { if (left.me.id === right.me.id) { return true; } return false; });
  const dispatch = useDispatch();

  useEffect(
    // have to change method to getInitialProps
    () => {
      dispatch({ type: SELECT_TEAM_REQUEST, data: { req: id } });
    },
    [],
  );
  useEffect(() => {
    if (isSelected) {
      const points = info.captures.map((obj) => new kakao.maps.LatLng(obj.lat, obj.lng));
      const options = {
        center: new kakao.maps.LatLng(38, 127.30),
        level: 5,
      };
      const map = new kakao.maps.Map(document.getElementById('stadiumAddress'), options);
      map.setDraggable(false);
      map.setZoomable(false);
      const bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < points.length; i++) {
        // need index for getting req, so don't use forEach etc.
        const marker = new kakao.maps.Marker({ position: points[i], clickable: true });
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', () => {
          Router.push(`/stadium/${info.captures[i].req}`);
        });
        bounds.extend(points[i]);
      }
      map.relayout();
      map.setBounds(bounds);
    }
  }, [isSelected]);
  return (
    <AppLayout2>
      <Row>
        <Col className={style.mainInfo}>
          <Card
            cover={(
              <div
                style={{ width: '100%', backgroundColor: '#ccc', opacity: '0.3' }}
              >
                <img
                alt="Main image of Team"
                src="https://via.placeholder.com/500x200/808080"
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
          <div className={style.fixedInfo}>
            <Tabs
              tabBarExtraContent={(isSelected && isLoggedIn && (info.req === me.Team.club)) ? <Button onClick={() => { message.warn('준비중입니다.'); }} shape="round"><QuestionCircleOutlined />팀 관리</Button> : null}
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
                    {isSelected && info.recruit}
                  </Descriptions.Item>
                </Descriptions>

                <div className={style.mapContainer}>
                  <div id="stadiumAddress" className={style.occupyMap} />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="선수 명단" key="2">
                <Skeleton active loading={!isSelected} />
                {isSelected
                                  && (
                                  <Table
                                    showHeader
                                    tableLayout="fixed"
                                    columns={memberColumns}
                                    pagination={{ pageSize: 15 }}
                                    scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, y: 550 }}
                                    dataSource={memberList}
                                    rowKey={(member) => member.id}
                                  />
                                  )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="전적" key="3">
                <Skeleton active loading={!isSelected} />
                {isSelected
                                  && (
                                  <Table
                                    showHeader
                                    columns={recordColumns}
                                    dataSource={info.record}
                                  />
                                  )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="사진" key="4">
                <Skeleton active />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 13, offset: 1 }} className={style.postWall}>
          <Feed where="team" req={id} />
        </Col>
      </Row>
    </AppLayout2>
  );
};
export default Stadium;
