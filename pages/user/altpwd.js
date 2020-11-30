import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Row, Col, Typography, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import axios from 'axios';

import { SET_PWD_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';

const Altpwd = () => {
  const { me, isSettingPwd, isSettedPwd, token } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dipatch = useDispatch();

  const submitAlterUserData = useCallback(() => {
    dipatch({
      type: SET_PWD_REQUEST,
      data: {
        password: form.getFieldValue('password'),
        prevpwd: form.getFieldValue('prevpwd'),
      },
      token,
    });
  }, []);
  useEffect(() => {
    if (!me) {
      message.error('로그인 후 접근 가능한 페이지입니다.', 10);
      Router.push('/stadia');
    }
  }, []);
  useEffect(() => {
    if (isSettedPwd) {
      message.success('비밀번호가 변경되었습니다.');
      Router.replace('/stadia');
    }
  }, [isSettedPwd]);
  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }} xxl={{ span: 6, offset: 9 }} style={{ margin: '0 auto', padding: '30px 10px 20px 10px', textAlign: 'center' }}>
          <Row justify="center">
            <Typography.Title level={3}><LockOutlined style={{ fontSize: '20px' }} /> 비밀번호 변경</Typography.Title>
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
                <Input prefix={<UserOutlined />} disabled defaultValue={me?.originalId} />
              </Form.Item>

              <Form.Item
                name="prevpwd"
                rules={[{ required: true, message: '6자 이상의 비밀번호를 확인해주세요!', min: 6 }]}
                label="비밀번호 확인"
              >
                <Input.Password placeholder="비밀번호 확인" />
              </Form.Item>

              <Form.Item
                name="password"
                label="비밀번호"
                rules={[
                  {
                    required: true,
                    message: '6자 이상 비밀번호를 입력해주세요!',
                    min: 6,
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="비밀번호 확인"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '비밀번호를 재확인해주세요!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('비밀번호가 일치하지 않습니다.');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item shouldUpdate wrapperCol={{ span: 24 }}>
                {() => (
                  <Button
                    type="primary"
                    style={{ width: '100%', borderRadius: '15px' }}
                    htmlType="submit"
                    loading={isSettingPwd}
                    disabled={!form.isFieldsTouched(['prevpwd', 'password', 'confirm'], true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                  >
                    비밀번호 변경
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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Authorization = '';
  let token = '';
  if (context.req && cookie) {
    if (cookie.indexOf(';') !== -1) {
      const index = cookie.indexOf('RefreshToken');
      token = cookie.indexOf(';', index) !== -1 ? cookie.slice(index + 13, cookie.indexOf(';', index)) : cookie.slice(index + 13);
    } else {
      token = cookie.slice(13);
    }
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    }
  }
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Altpwd;
