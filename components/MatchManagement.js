import React, { useCallback, useEffect, useState } from 'react';
import { Button, message, Space, Table, Tooltip } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import CaptureMatch from './CaptureMatch';
import ReserveMatch from './ReserveMatch';
import { PATCH_APPROVAL_REQUEST, PATCH_CANCEL_REQUEST, PATCH_LOSER_REQUEST, PATCH_WINNER_REQUEST, SELECT_MATCHES_REQUEST } from '../reducers/matches';

const MatchManagement = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.user.me.LeaderId);
  const token = useSelector((state) => state.user.token);
  const { matches, isPatchingWinner, pacthWinnerErrorReason, isPatchingLoser, pacthLoserErrorReason, isPatchingApproval, pacthApprovalErrorReason, isPatchingCancel, pacthCancelErrorReason } = useSelector((state) => state.matches);
  const [captureVisiblity, onCaptureVisiblity] = useState(false);
  const [matchVisiblity, onMatchVisiblity] = useState(false);
  const { isSelecting: matchesSelecting } = useSelector((state) => state.matches);


  const setCaptureVisiblity = useCallback(() => {
    onCaptureVisiblity(!captureVisiblity);
  }, []);
  const setMatchVisiblity = useCallback(() => {
    onMatchVisiblity(!matchVisiblity);
  }, []);
  const onClickWinner = useCallback((data) => () => {
    dispatch({
      type: PATCH_WINNER_REQUEST,
      data: {
        matchId: data.id,
        teamId: data.teamId,
      },
      token,
    });
  }, []);
  const onClickLoser = useCallback((data) => () => {
    dispatch({
      type: PATCH_LOSER_REQUEST,
      data: {
        matchId: data.id,
        teamId: data.teamId,
      },
      token,
    });
  }, []);
  const onClickApprove = useCallback((data) => () => {
    dispatch({
      type: PATCH_APPROVAL_REQUEST,
      data: {
        matchId: data,
      },
      token,
    });
  }, []);
  const onClickCancel = useCallback((data) => () => {
    dispatch({
      type: PATCH_CANCEL_REQUEST,
      data: {
        matchId: data,
      },
      token,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: SELECT_MATCHES_REQUEST,
      data: {
        teamId,
      },
      token,
    });
  }, []);

  useEffect(() => {
    if (pacthWinnerErrorReason || pacthApprovalErrorReason || pacthCancelErrorReason || pacthLoserErrorReason) {
      message.error(pacthWinnerErrorReason || pacthApprovalErrorReason || pacthCancelErrorReason || pacthLoserErrorReason);
    }
  }, [pacthWinnerErrorReason, pacthApprovalErrorReason, pacthCancelErrorReason, pacthLoserErrorReason]);
  return (
    <>
      <Table
        scroll={{ x: 'max-content' }}
        tableLayout="auto"
        loading={matchesSelecting}
        dataSource={matches}
        rowKey={(match) => match.id}
        pagination={{ responsive: true, pageSize: 8 }}
        footer={() => (
          <Space>
            <Button type="primary" onClick={setCaptureVisiblity}>점령전 신청</Button>
            <Button type="default" onClick={setMatchVisiblity}>경기 신청</Button>
          </Space>
        )}
      >
        <Table.Column title="홈팀" dataIndex={['Home', 'title']} align="center"
          render={(value, row) => {
            if (row.HomeId !== teamId) {
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
            if (row.AwayId !== teamId) {
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
                  <Button type="link" size="small" onClick={onClickWinner({ id: row.id, teamId })} loading={isPatchingWinner}>승리</Button>
                  <Button type="text" danger size="small" onClick={onClickLoser({ id: row.id, teamId })} loading={isPatchingLoser}>패배</Button>
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
              }
              if (value === 'N') {
                return '거절';
              }
              if (value === 'T') {
                return '시간 초과';
              }
            }
            if (teamId !== row.HomeId) {
              return '승인 대기중';
            }
            return (
              <Space>
                <Button type="text" size="small" onClick={onClickApprove(row.id)} loading={isPatchingApproval}>승인</Button>
                <Button type="text" danger size="small" onClick={onClickCancel(row.id)} loading={isPatchingCancel}>거절</Button>
              </Space>
            );
          }}
        />
      </Table>
      {
        captureVisiblity
        && <CaptureMatch visible={captureVisiblity} setVisible={onCaptureVisiblity} />
      }
      {
        matchVisiblity
        && <ReserveMatch visible={matchVisiblity} setVisible={onMatchVisiblity} />
      }
    </>
  );
};

export default MatchManagement;