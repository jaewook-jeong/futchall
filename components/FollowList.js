import React, { useCallback } from 'react';
import { Row, Button, Divider, Col } from 'antd';
import PropTypes from 'prop-types';

import style from '../SCSS/followList.module.scss';


const FollowList = (props) => {
  // if props.following === true  following, false follower
  const { following, teamList, userList, stadiumList } = props;
  if (teamList.length === 0 && userList.length === 0 && stadiumList.length === 0) return null;

  const followImage = useCallback((data, index) => (
    <Col className={style.followContent} key={index} span={8}>
      <div className={style.imageContainer}>
        <div className={style.centeredDiv}>
          <img src={data.src} alt={data.src} className={style.imgTag} />
        </div>
      </div>
      <div className={style.followTitle}>
        {data?.title}
        {data?.nickname}
      </div>
    </Col>
  ), []);

  return (
    <Row className={style.followList}>
      <Col className={style.title}>
        <Row>
          <Col flex="auto">
            {following ? '팔로잉' : '팔로워'}
          </Col>
          <Col flex="100px">
            <Button type="link">더 보기</Button>
          </Col>
        </Row>
      </Col>
      <Col className={style.listContent}>
        {teamList.length !== 0
          && (
          <div>
            <Divider orientation="left">팀 목록</Divider>
            <Row>
              {teamList.map((v, i) => {
                followImage(v, i);
              })}
            </Row>
          </div>
          )}
        {userList.length !== 0
          && (
          <div>
            <Divider orientation="left">유저 목록</Divider>
            <Row>
              {userList.map((v, i) => {
                followImage(v, i);
              })}
            </Row>
          </div>
          )}
        {stadiumList.length !== 0
          && (
          <div>
            <Divider orientation="left">구장 목록</Divider>
            <Row>
              {stadiumList.map((v, i) => {
                followImage(v, i);
              })}
            </Row>
          </div>
          )}
      </Col>
    </Row>
  );
};

FollowList.propTypes = {
  props: PropTypes.shape({
    following: PropTypes.bool.isRequired,
    teamList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        src: PropTypes.string,
      }),
    ),
    userList: PropTypes.arrayOf(
      PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        src: PropTypes.string,
      }),
    ),
    stadiumList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        src: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default FollowList;
