import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Space, Table, Tag } from 'antd';
import axios from 'axios';

const JoinInManagement = ({ joinInData }) => {
  const onClick = useCallback((data) => () => {
    console.log('------------------------------------');
    console.log(data);
    console.log('------------------------------------');
    axios.patch('http://localhost:3065/user/joinmanage', data, { withCredentials: true })
      .then((result) => console.log(result.data))
      .catch((err) => {
        console.error(err.response.data);
        message.error(err.response.data);
      });
  }, []);

  return (
    <>
      <Table
        dataSource={joinInData}
        rowKey={(user) => user.id}
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
              <Button type="text" size="small" onClick={onClick({ value, action: 'approve' })}>승인</Button>
              <Button type="text" danger size="small" onClick={onClick({ value, action: 'cancel' })}>거절</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

JoinInManagement.propTypes = {
  joinInData: PropTypes.array,
};

export default JoinInManagement;
