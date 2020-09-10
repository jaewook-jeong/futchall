import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Popover, List, Avatar, Descriptions, Tabs, Button, message, Card, Space } from 'antd';
import { SettingOutlined, RightOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import Router from 'next/router';

import { LOG_OUT_REQUEST } from '../reducers/user';

const ProfileAvatar = () => {
  const { me } = useSelector(
    (state) => state.user,
    (left, right) => { if (left.me.originalId === right.me.originalId) { return true; } return false; },
  );
  const { isLoggingOut, isLoggedOut, logOutErrorReason} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);

  useEffect(() => {
    if (isLoggedOut) {
      message.info('정상적으로 로그아웃되었습니다.');
    }
  }, [isLoggedOut]);

  useEffect(() => {
    if (logOutErrorReason) {
      message.error(logOutErrorReason);
    }
  }, [logOutErrorReason]);

  return (
    <Space>
      <Avatar
        src={`http://localhost:3065/${me.Images[0]?.src}`}
        alt={me.nickname}
      >{!me.Images[0]?.src && me.nickname}
      </Avatar>
      <Popover
        placement="rightTop"
        trigger="click"
        content={(
          <Tabs type="card" size="small" defaultActiveKey="2" style={{ width: '250px' }}>
            <Tabs.TabPane tab="최근 본 구장" key="1">
              <List
                footer={<Button size="small" shape="round" onClick={() => console.log('삭제')} block><DeleteOutlined />최근 본 구장 삭제하기</Button>}
                // itemLayout="vertical"
                pagination={{ pageSize: 3 }}
                dataSource={[{ title: '누상동 다목적 운동장', address: '서울-종로', src: '' }, { title: '서대문 돌산구장', address: '서울-서대문', src: '' }]}
                renderItem={(item) => (
                  <List.Item>
                    <Card style={{ width: '100%' }} size="small">
                      <Card.Meta
                        avatar={<Avatar src={item.src ?? 'https://www.americaskidsinmotion.com/wp-content/uploads/2016/05/product-soccer-ball.jpg'} />}
                        title={item.title}
                        description={item.address}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="회원정보" key="2">
              <Descriptions layout="horizontal" column={1} style={{ width: '200px' }} colon={false}>
                <Descriptions.Item label="닉네임">{me.nickname}</Descriptions.Item>
                <Descriptions.Item label="아이디">{me.originalId}</Descriptions.Item>
                {me?.TeamId && <Descriptions.Item label="팀"><Link href={`/team/${me.TeamId}`}><a>{me.Team.title}</a></Link></Descriptions.Item> }
              </Descriptions>
              <Button size="default" block style={{ borderRadius: '5px' }} onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
            </Tabs.TabPane>
            <Tabs.TabPane tab="계정관리" key="3">
              <Button block style={{ border: 0, borderBottom: '1px solid #dadce0' }} onClick={() => Router.push('/user/profile')}>회원정보 수정<RightOutlined style={{ float: 'right', lineHeight: '25px' }} /></Button>
              <Button block style={{ border: 0, borderBottom: '1px solid #dadce0' }} onClick={() => Router.push('/user/altpwd')}>비밀번호 변경<RightOutlined style={{ float: 'right', lineHeight: '25px' }} /></Button>
              <Button block style={{ border: 0, borderBottom: '1px solid #dadce0' }}>사진 변경<RightOutlined style={{ float: 'right', lineHeight: '25px' }} /></Button>
            </Tabs.TabPane>
          </Tabs>
        )}
      >
        <DownOutlined />
      </Popover>
    </Space>
  );
};

export default ProfileAvatar;
