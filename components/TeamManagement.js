import React, { useCallback, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Button, Drawer, message, Space, Table, Tabs } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import MatchManagement from './MatchManagement';
import JoinInManagement from './JoinInManagement';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const TeamManagement = ({ setVisible, teamId, visible }) => {
  const [tabkey, setTabKey] = useState('1');
  const { data, error } = useSWR(`http://localhost:3065/team/${teamId}/management/${tabkey}`, fetcher);
  const [, forceUpdate] = useState();
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  useEffect(() => {
    if (error) {
      message.error(error);
      setVisible(false);
    }
  }, [error]);

  console.log(data);
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
        tabBarExtraContent={{ left: <Button type="primary" shape="circle" onClick={() => mutate(`http://localhost:3065/team/${teamId}/management/${tabkey}`)} loading={!data && !error} icon={<ReloadOutlined />} style={{ marginRight: '15px' }} /> }}
        type="card"
        onChange={(key) => { setTabKey(key); }}
      >
        <Tabs.TabPane key="1" tab="경기관리">
          {
            !data && !error && <LoadingOutlined />
          }
          {
            tabkey === '1'
            && <MatchManagement matchData={data} />
          }
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="입단신청">
          {
            !data && !error && <LoadingOutlined />
          }
          {
            tabkey === '2'
            && <JoinInManagement joinInData={data} />
          }
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="정보 수정">
          {
            !data && !error && <LoadingOutlined />
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
