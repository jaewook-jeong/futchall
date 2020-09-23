import React, { useCallback, useState } from 'react';
import { Button, message, Space, Table, Tooltip } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import axios from 'axios';
import PropTypes from 'prop-types';
import { mutate } from 'swr';

import CaptureMatch from './CaptureMatch';

const MatchManagement = ({ matchData }) => {
  const [captureVisiblity, onCaptureVisiblity] = useState(false);
  const setCaptureVisiblity = useCallback(() => {
    onCaptureVisiblity(!captureVisiblity);
  }, []);
  const onClickWinner = useCallback((data) => () => {
    axios.patch(`http://localhost:3065/match/${data.id}/winner/${data.teamId}`, { withCredentials: true })
      .then((result) => {
        message.success('승리팀으로 등록되었습니다!');
        mutate(`http://localhost:3065/team/${data.teamId}/management/1`);
      })
      .catch((err) => {
        console.error(err.response.data);
        message.error(err.response.data);
      });
  }, []);
  const onClickLoser = useCallback((data) => () => {
    axios.patch(`http://localhost:3065/match/${data.id}/loser/${data.teamId}`, { withCredentials: true })
      .then((result) => message.success('상대팀을 승리팀으로 등록하였습니다.'))
      .catch((err) => {
        console.error(err.response.data);
        message.error(err.response.data);
      });
  }, []);
  const onClickApprove = useCallback((data) => () => {
    axios.patch(`http://localhost:3065/match/${data}/approve`, { withCredentials: true })
      .then((result) => message.success('경기를 승인하였습니다!'))
      .catch((err) => {
        console.error(err.response.data);
        message.error(err.response.data);
      });
  }, []);
  const onClickCancel = useCallback((data) => () => {
    axios.patch(`http://localhost:3065/match/${data}/cancel`, { withCredentials: true })
      .then((result) => message.success('경기를 취소하였습니다.'))
      .catch((err) => {
        console.error(err.response.data);
        message.error(err.response.data);
      });
  }, []);

  return (
    <>
      <Table
        dataSource={matchData}
        rowKey={(match) => match.id}
        pagination={{ responsive: true }}
        footer={() => (
          <Button type="primary" onClick={setCaptureVisiblity}>점령전 신청</Button>
        )}
      >
        <Table.Column title="홈팀" dataIndex={['Home', 'title']} align="center"
          render={(value, row) => {
            if (row.HomeId !== row.TeamId) {
              return (
                <Link href={`/team/${row.HomeId}`}>
                  <a>{row.capture === 'Y' && <Tooltip title="점령전">*</Tooltip>}{value}</a>
                </Link>
              );
            }
            return (<span>{row.capture === 'Y' && <Tooltip title="점령전">*</Tooltip>}{value}</span>);
          }}
        />
        <Table.Column title="신청팀" dataIndex={['Away', 'title']} align="center"
          render={(value, row) => {
            if (row.AwayId !== row.TeamId) {
              return (
                <Link href={`/team/${row.AwayId}`}>
                  <a>{value}</a>
                </Link>
              );
            }
            return value;
          }}
        />
        <Table.Column title="경기일자" dataIndex="date" align="center"
          render={(value) => moment(value.toString()).locale('ko').format('YYYY-MM-DD HH:mm')}
        />
        <Table.Column title="장소" dataIndex={['Stadium', 'title']} align="center"
          render={(value, row) => <Link href={`/stadium/${row.StadiumId}`}><a>{value}</a></Link>}
        />
        <Table.Column title="승리팀" dataIndex={['Winner', 'title']} align="center"
          render={(value, row) => {
            if (value) {
              // 승리팀 등록이 완료되었을 때
              return value;
            }
            // 승리팀이 미등록 되었을 때
            if (row.confirm === 'Y') {
              return (
                <Space>
                  <Button type="link" size="small" onClick={onClickWinner({ id: row.id, teamId: row.TeamId })}>승리</Button>
                  <Button type="text" danger size="small" onClick={onClickLoser({ id: row.id, teamId: row.TeamId })}>패배</Button>
                </Space>
              );
            }
            return '-';
          }}
        />
        <Table.Column title="처리" dataIndex="confirm" align="center"
          render={(value, row) => {
            if (value) {
              if (value === 'Y') {
                return '승인';
              } if (value === 'N') {
                return '거절';
              }
              return '시간 초과';
            }
            if (moment().diff(moment(row.date.toString()).locale('ko').format('YYYY-MM-DD HH:mm'), 'hours') > -3) {
              axios.patch(`http://localhost:3065/match/${row.id}/timeout`, { withCredentials: true }).then((result) => result.data);
              return '시간초과';
            }
            if (row.TeamId !== row.HomeId) {
              return '승인 대기중';
            }
            return (
              <Space>
                <Button type="text" size="small" onClick={onClickApprove(row.id)}>승인</Button>
                <Button type="text" danger size="small" onClick={onClickCancel(row.id)}>거절</Button>
              </Space>
            );
          }}
        />
      </Table>
      {captureVisiblity
        && <CaptureMatch visible={captureVisiblity} setVisible={onCaptureVisiblity} />}
    </>
  );
};

MatchManagement.propTypes = {
  matchData: PropTypes.array,
};

export default MatchManagement;