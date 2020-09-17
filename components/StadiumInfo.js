import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Tabs, Button, Descriptions, Tooltip, Typography, Tag, notification, message } from 'antd';
import { HeartTwoTone, QuestionCircleOutlined } from '@ant-design/icons';

import { SELECT_STADIUM_REQUEST, TAKE_STADIUM_REQUEST } from '../reducers/stadium';
import { multipleSpecaility } from '../util/columns';

const StadiumInfo = (props) => {
  const dispatch = useDispatch();
  const { list, nowSelected } = props;
  const { info, isSelected, isTakingStadium, isTakenStadium, takenStadiumErrorReason } = useSelector((state) => state.stadium);

  const takeStadium = useCallback(() => {
    dispatch({
      type: TAKE_STADIUM_REQUEST,
      data: {
        id: info.id,
      },
    });
  }, [info]);

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
    dispatch({ type: SELECT_STADIUM_REQUEST, data: list[nowSelected].id });
  }, [nowSelected]);

  return (
    <Tabs
      type="card"
      tabBarExtraContent={(
        <Button
          type="link"
          onClick={() => { console.log('click'); }}
          icon={<HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '24px' }} />}
        />
      )}
    >
      <Tabs.TabPane
        tab="구장정보"
        key="1"
      >
        <Descriptions
          column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
          <Descriptions.Item label="주소">
            {isSelected && info.address}
          </Descriptions.Item>
          <Descriptions.Item label="사용시간">
            {isSelected && info.time}
          </Descriptions.Item>
          <Descriptions.Item label="라이트 여부">
            {isSelected && info.light}
          </Descriptions.Item>
          <Descriptions.Item label="특징">
            {isSelected && info.special.split(',').map((c) => (<Tag key={c}>#{multipleSpecaility[c]}</Tag>))}
          </Descriptions.Item>
          <Descriptions.Item label="소개" span={2}>
            {isSelected
            && (
            <Typography.Paragraph
              ellipsis={{ rows: 1, expandable: true, symbol: <span>더보기</span> }}
            >
              {info.description}
            </Typography.Paragraph>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="점령 팀">
            {(isSelected && info.Team?.id) ? <a onClick={() => Router.push(`/team/${info.TeamId}`)}>{info.Team.title}</a> : <Button type="primary" onClick={takeStadium} loading={isTakingStadium}>점령하기</Button>}
          </Descriptions.Item>
          <Descriptions.Item label={<>유효기간 <Tooltip title="점령 후 도전을 받지 않을 시 유지되는 기간입니다."><QuestionCircleOutlined /></Tooltip></>}>
            {isSelected && info.valid}
          </Descriptions.Item>
        </Descriptions>
      </Tabs.TabPane>
    </Tabs>
  );
};
StadiumInfo.propTypes = {
  list : PropTypes.array,
  nowSelected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default StadiumInfo;
