import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Col, Row, Typography } from 'antd';
import { LOAD_LIST_REQUEST } from '../../reducers/team';
import AppLayout from '../../components/AppLayout';
import { RankingColumns as columns } from '../../util/columns';

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
