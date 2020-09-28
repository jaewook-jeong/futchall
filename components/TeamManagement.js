import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Drawer, Tabs } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import MatchManagement from './MatchManagement';
import JoinInManagement from './JoinInManagement';
import TeamInfoManagement from './TeamInfoManagement';
import { SELECT_MATCHES_REQUEST } from '../reducers/matches';

const TeamManagement = ({ setVisible, teamId, visible }) => {
  const [tabkey, setTabKey] = useState('1');
  const dispatch = useDispatch();
  const { isSelecting: matchesSelecting } = useSelector((state) => state.matches);
  const { isSelecting: teamInfoSelecting } = useSelector((state) => state.team);
  const { isSelecting: userListSelecting } = useSelector((state) => state.user);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onReset = useCallback(() => {
    if (tabkey === '1') {
      dispatch({
        type: SELECT_MATCHES_REQUEST,
        data: {
          teamId,
        },
      });
    } else if (tabkey === '2') {
      // 유저정보
    }
  }, []);

  return (
    <Drawer
      title="팀 관리"
      placement="left"
      visible={visible}
      onClose={onClose}
      width="80%"
    >
      <Tabs
        defaultActiveKey={tabkey}
        tabBarExtraContent={{ right: <Button type="primary" shape="circle" onClick={onReset} loading={matchesSelecting || teamInfoSelecting || userListSelecting} icon={<ReloadOutlined />} style={{ marginRight: '15px' }} /> }}
        type="card"
        onChange={(key) => setTabKey(key)}
      >
        <Tabs.TabPane key="1" tab="경기관리">
          {
            matchesSelecting && <LoadingOutlined />
          }
          {
            tabkey === '1'
            && <MatchManagement />
          }
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="가입관리">
          {
            userListSelecting && <LoadingOutlined />
          }
          {
            tabkey === '2'
            && <JoinInManagement teamId={teamId} />
          }
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="정보수정">
          {
            teamInfoSelecting && <LoadingOutlined />
          }
          {
            tabkey === '3'
            && <TeamInfoManagement />
          }
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );
};

TeamManagement.propTypes = {
  setVisible: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default TeamManagement;
