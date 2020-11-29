import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';
import { Popover, List, Avatar, Descriptions, Tabs, Button, message, Card, Space, Empty } from 'antd';
import { RightOutlined, DeleteOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import Router from 'next/router';
import useSWR from 'swr';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { backUrl } from '../config/config';

const fetcher = (url) => axios.get(url).then((result) => result.data);

const ProfileAvatar = () => {
  const { me, token } = useSelector((state) => state.user);
  const { isLoggingOut, isLoggedOut, logOutErrorReason} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST, token });
  }, []);

  const { data, error } = useSWR(`${backUrl}/stadium/visited`, fetcher, { revalidateOnFocus: false });

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
      <Popover
        placement="rightTop"
        trigger="click"
        content={(
          <Tabs type="card" size="small" defaultActiveKey="2" style={{ width: '250px' }}>
            <Tabs.TabPane tab="최근 본 구장" key="1">
              {
                !data && !error && <LoadingOutlined />
              }
              {
                (!error && data && data?.length === 0) ?
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                <List
                  footer={<Button size="small" shape="round" onClick={() => console.log('삭제')} block><DeleteOutlined />최근 본 구장 삭제하기</Button>}
                  // itemLayout="vertical"
                  pagination={{ pageSize: 3 }}
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <Card style={{ width: '100%', cursor: 'pointer' }} size="small" onClick={()=> Router.push(`/stadium/${item.id}`)}>
                        <Card.Meta
                          avatar={<Avatar src={item?.Images[0]?.src ?? 'https://www.americaskidsinmotion.com/wp-content/uploads/2016/05/product-soccer-ball.jpg'} />}
                          title={item.title}
                          description={item.address}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              }
              
            </Tabs.TabPane>
            <Tabs.TabPane tab="회원정보" key="2">
              <Descriptions layout="horizontal" column={1} style={{ width: '200px' }} colon={false}>
                <Descriptions.Item label="닉네임">{me.nickname}</Descriptions.Item>
                <Descriptions.Item label="아이디">{me.originalId}</Descriptions.Item>
                {me?.TeamId && <Descriptions.Item label="팀"><Link href={`/team/${me.TeamId}`} prefetch={false}><a>{me.Team.title}</a></Link></Descriptions.Item> }
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
        <Space>
          <Avatar
            src={me.Images[0] && `${me.Images[0]?.src}`}
            alt={me.nickname}
            gap="3"
          >{!me.Images[0]?.src && me.nickname}
          </Avatar>
          <DownOutlined />
        </Space>
      </Popover>
    </Space>
  );
};

export default ProfileAvatar;
