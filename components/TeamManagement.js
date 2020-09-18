import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Drawer, message, Space, Table, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);
const managementMatch = [

// PostId: null

// WinnerId: 1
// captrue: "N"
// confirm: "Y"
  {
    title: '홈 팀',
    align: 'center',
    dataIndex: ['Home', 'title'],
    render: (value, row) => <Link href={`/team/${row.HomeId}`}><a>{value}</a></Link>
  },
  {
    title: '신청팀',
    align: 'center',
    dataIndex: ['Away', 'title'],
    render: (value, row) => <Link href={`/team/${row.AwayId}`}><a>{value}</a></Link>
  },
  {
    title: '경기일자',
    align: 'center',
    dataIndex: 'date',
    render: (value) => moment(value.toString()).locale('ko').format('YYYY-MM-DD HH:mm'),
  },
  {
    title: '경기장소',
    align: 'center',
    dataIndex: ['Stadium', 'title'],
    render: (value, row) => <Link href={`/stadium/${row.StadiumId}`}><a>{value}</a></Link>
  },
  {
    title: '승리 팀',
    align: 'center',
    dataIndex: ['Winner', 'title'],
    render: (value, row) => {
      if (value) {
        //승리팀 등록이 완료되었을 때
        return value;
      } else {
        // 승리팀이 미등록 되었을 때
        if (row.confirm === "Y") {
          return <Space><a>승리</a><a>패배</a></Space>;
        } else {
          return "-";
        }
      }
    }
  },
  {
    title: '처리',
    align: 'center',
    dataIndex: 'confirm',
    render: (value, row) => {
      if (value) {
        if (value === "Y") {
          return "승인";
        } else {
          return "거절";
        }
      } else {
        if (row.TeamId !== row.HomeId) {
          return '승인 대기중';
        }
        return (
          <Space>
            <a>승인</a>
            <a>거절</a>
          </Space>
        );
      }
    },
  },
];
const joinInTeam = [
  {
    title: '닉네임',
    align: 'center',
    dataIndex: 'nickname',
  },
  {
    title: '포지션',
    align: 'center',
    dataIndex: 'positions',
  },
  {
    title: '지역',
    align: 'center',
    dataIndex: 'locations',
  },
  {
    title: '나이',
    align: 'center',
    dataIndex: 'age',
  },
  {
    title: '처리',
    align: 'center',
    dataIndex: 'id',
    render: (val) => (
      <Space>
        <a>승인</a>
        <a>거절</a>
      </Space>
    ),
  },
];
const TeamManagement = ({ setVisible, teamId, visible }) => {
  const [tabkey, setTabKey] = useState('1');
  const { data, error } = useSWR(`http://localhost:3065/team/${teamId}/management/${tabkey}`, fetcher);
  
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  useEffect(() => {
    if (error) {
      message.error(error);
      setVisible(false);
    }
  }, [error])
  console.log(data);
  return (
    <Drawer
      title="팀 관리"
      placement="left"
      visible={visible}
      onClose={onClose}
      width="70%"
    >
      <Tabs
        defaultActiveKey={tabkey}
        type="card"
        onChange={(key) => { setTabKey(key); }}
      >
        <Tabs.TabPane key="1" tab="경기관리">
          {
            !data && !error && <LoadingOutlined />
          }
          <Table columns={managementMatch} dataSource={data} rowKey={(match) => match.id} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="입단신청">
          {
            !data && !error && <LoadingOutlined />
          }
          <Table columns={joinInTeam} dataSource={data} />
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
