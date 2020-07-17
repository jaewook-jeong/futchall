import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Col, Row, Typography } from 'antd';
import { LOAD_LIST_REQUEST } from '../../reducers/team';
import AppLayout from '../../components/AppLayout';

const columns = [
  {
    title: '순위',
    width: 60,
    dataIndex: 'rank',
    fixed: 'left',
    align: 'center',
    ellipsis: true,
    sorter: (a, b) => a.rank - b.rank,
  },
  {
    title: '팀 명',
    width: 100,
    dataIndex: 'name',
    fixed: 'left',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '활동지역',
    width: 120,
    align: 'center',
    dataIndex: 'location',
    filters: [
      {
        text: '서울',
        value: '서울',
      },
      {
        text: '경기',
        value: '경기',
      },
      {
        text: '부산',
        value: '부산',
      },
      {
        text: '인천',
        value: '인천',
      },
      {
        text: '대구',
        value: '대구',
      },
      {
        text: '광주',
        value: '광주',
      },
      {
        text: '대전',
        value: '대전',
      },
      {
        text: '울산',
        value: '울산',
      },
      {
        text: '세종',
        value: '세종',
      },
      {
        text: '강원',
        value: '강원',
      },
      {
        text: '충북',
        value: '충북',
      },
      {
        text: '충남',
        value: '충남',
      },
      {
        text: '전북',
        value: '전북',
      },
      {
        text: '전남',
        value: '전남',
      },
      {
        text: '경북',
        value: '경북',
      },
      {
        text: '경남',
        value: '경남',
      },
      {
        text: '제주',
        value: '제주',
      },
    ],
    onFilter: ((value, record) => { record.location.indexOf(value) === 0; }),
  },
  {
    title: '점령 구장 수',
    dataIndex: 'occupation',
    width: 80,
    align: 'center',
  },
  {
    title: '회원모집',
    dataIndex: 'recruit',
    width: 80,
    align: 'center',
  },
  {
    title: '비고',
    dataIndex: 'leader',
    // fixed: 'right',
    align: 'center',
    width: 80,
    render: (value) => <div><a onClick={() => { console.log(value); }}>연락하기</a></div>,
  },
];

const Ranking = () => {
  const dispatch = useDispatch();
  const { rankingList, isLoading } = useSelector((state) => state.team);
  useEffect(
    () => {
      dispatch({
        type: LOAD_LIST_REQUEST,
      });
    }, [],
  );
  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <Typography.Title level={3}>
            구장깨기 순위
          </Typography.Title>

          <Table
            loading={isLoading}
            showHeader
            columns={columns}
            scroll={{ x: 'max-content', scrollToFirstRowOnChange: true }}
            pagination={{ pageSize: 50 }}
            dataSource={rankingList}
            size="small"
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Ranking;
