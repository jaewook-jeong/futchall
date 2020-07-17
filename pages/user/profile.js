import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Row, Col, Typography, Form, Select, Input, Space, Tooltip, Button, message } from 'antd';
import { UserOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';

import { ageGroup, locations, positions } from '../../util/selectOptions';
import { CHANGE_TO_REQUEST } from '../../reducers/user';
import AppLayout from '../../components/AppLayout';

const Profile = () => {
  const { me, isChangingTo } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dipatch = useDispatch();

  const submitAlterUserData = useCallback(() => {
    alert('프로필 페이지', form.getFieldsValue());
    dipatch({
      type: CHANGE_TO_REQUEST,
      data: { ...form.getFieldsValue() },
    });
  }, []);
  useEffect(() => {
    if (!me) {
      message.error('로그인 후 접근 가능한 페이지입니다.', 10);
      Router.push('/stadia');
    }
  }, []);
  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }} xxl={{ span: 6, offset: 9 }} style={{ margin: '0 auto', padding: '30px 10px 20px 10px', textAlign: 'center' }}>
          <Row justify="center">
            <Typography.Title level={3}><EditOutlined style={{ fontSize: '20px' }} /> 회원정보 수정</Typography.Title>
          </Row>
          <Row>
            <Form
              layout="horizontal"
              style={{ width: '100%' }}
              form={form}
              colon={false}
              onFinish={submitAlterUserData}
              labelAlign="left"
              labelCol={{ flex: '0.3 0 130px' }}
              wrapperCol={{ flex: '1 1 170px' }}
            >
              <Form.Item
                name="id"
                label="아이디"
              >
                <Input prefix={<UserOutlined />} disabled defaultValue={me?.id} />
              </Form.Item>
              <Form.Item
                name="nickname"
                label={<Space>닉네임<Tooltip title="설정하신 닉네임으로 활동하게 됩니다!"><QuestionCircleOutlined /></Tooltip></Space>}
              >
                <Input placeholder="닉네임" defaultValue={me?.nickname} />
              </Form.Item>
              <Form.Item
                name="prevpwd"
                dependencies={['alterpwd']}
                rules={[{ required: true, message: '비밀번호를 확인해주세요!' }]}
                label="비밀번호 확인"
              >
                <Input.Password placeholder="비밀번호 확인" />
              </Form.Item>

              <Form.Item
                name="selectedPositions"
                label="풋살 포지션"
              >
                <Select
                  size="middle"
                  mode="multiple"
                  placeholder="풋살 포지션을 선택해주세요"
                  defaultValue={me?.positions}
                >
                  {positions}
                </Select>
              </Form.Item>

              <Form.Item
                name="age"
                label="연령대"
              >
                <Select
                  size="middle"
                  placeholder="연령대를 체크해 주세요"
                  defaultValue={me?.age}
                >
                  {ageGroup}
                </Select>
              </Form.Item>

              <Form.Item
                name="selectedLocations"
                label="활동지역"
              >
                <Select
                  size="middle"
                  mode="multiple"
                  defaultValue={me?.locations}
                >
                  {locations}
                </Select>
              </Form.Item>

              <Form.Item shouldUpdate wrapperCol={{ span: 24 }}>
                {() => (
                  <Button
                    type="primary"
                    style={{ width: '100%', borderRadius: '15px' }}
                    htmlType="submit"
                    loading={isChangingTo}
                    disabled={!form.isFieldTouched('prevpwd') || form.getFieldsError().filter(({ errors }) => errors.length).length}
                  >
                    회원정보 수정
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </AppLayout>
  );
};
export default Profile;
