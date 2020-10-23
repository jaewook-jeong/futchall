import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { SELECT_LIST_REQUEST, JOIN_MANAGE_REQUEST } from '../reducers/user';

const JoinInManagement = ({ teamId }) => {
  const { userList, isApproving, isCanceling, isSelecting: userListSelecting, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClick = useCallback((data) => () => {
    dispatch({
      type: JOIN_MANAGE_REQUEST,
      data: {
        userId: data.value,
        action: data.action,
      },
      token,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: SELECT_LIST_REQUEST,
      data: {
        teamId,
      },
      token,
    });
  }, []);
  return (
    <>
      <Table
        scroll={{ x: 'max-content' }}
        dataSource={userList}
        rowKey={(user) => user.id}
        loading={userListSelecting}
      >
        <Table.Column
          title="닉네임"
          align="center"
          dataIndex="nickname"
        />
        <Table.Column
          title="포지션"
          align="center"
          dataIndex="positions"
          render={(val) => (<div>{val.split(',').map((v) => <Tag key={v} color={v == 'FIXO' ? 'blue' : v === 'ALA' ? 'green' : v === 'PIVO' ? 'red' : 'orange'}>{v}</Tag>)}</div>)}
        />
        <Table.Column
          title="지역"
          align="center"
          dataIndex="locations"
          render={(val) => (<div>{val.split(',').map((v) => <Tag key={v}>{v}</Tag>)}</div>)}
        />
        <Table.Column
          title="나이"
          align="center"
          dataIndex="age"
        />
        <Table.Column
          title="처리"
          align="center"
          dataIndex="id"
          render={(value) => (
            <Space>
              <Button type="text" size="small" onClick={onClick({ value, action: 'approve' })} loading={isApproving}>승인</Button>
              <Button type="text" danger size="small" onClick={onClick({ value, action: 'cancel' })} loading={isCanceling}>거절</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

JoinInManagement.propTypes = {
  teamId: PropTypes.string.isRequired,
};

export default JoinInManagement;
