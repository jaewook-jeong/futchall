import React from 'react';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { CaretLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

import styles from '../SCSS/matchCard.module.scss';

const MatchCard = ({ match }) => (
  <Card className={styles.matchCard}>
    <Row>
      <Col span="13">
        <Row className={match.WinnerId !== match.HomeId && styles.loser}>
          <Tooltip title="홈 팀">{match.Home.title}</Tooltip>
          {
            match.WinnerId === match.HomeId && <Tooltip title="승리팀"><CaretLeftOutlined /></Tooltip>
          }
        </Row>
        <Row className={match.WinnerId !== match.AwayId && styles.loser}>
          <Tooltip title="원정 팀" placement="bottom">{match.Away.title}</Tooltip>
          {
            match.WinnerId === match.AwayId && <Tooltip title="승리팀"><CaretLeftOutlined /></Tooltip>
          }
        </Row>
      </Col>
      <Col span="10" offset="1">
        <Row>
          <Tooltip title={moment(match.date.toString()).locale('ko').format('YYYY-MM-DD HH:mm:ss')}>
            {moment(match.date.toString()).locale('ko').format('MM/DD (ddd)')}
          </Tooltip>
          {
            match.capture === 'Y' && <Tooltip title="점령전"><CheckCircleOutlined /></Tooltip>
          }
        </Row>
        <Row>
          <Link href={`/stadium/${match.StadiumId}`} prefetch={false}><a>{match.Stadium.title}</a></Link>
        </Row>
      </Col>
    </Row>

  </Card>
);

MatchCard.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MatchCard;
