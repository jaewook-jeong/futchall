import React, { useCallback, useMemo, useEffect } from 'react';
import { Button, Input, Modal, Form, Checkbox, message } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { LOG_IN_REQUEST } from '../reducers/user';
import { SET_USER_ID } from '../reducers/messenger';

const LoginForm = (props) => {
  const { visible, setVisible } = props;
  const { isLoggingIn, logInErrorReason } = useSelector((state) => state.user, shallowEqual);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onHandleCancel = useCallback(() => {
    form.resetFields(['originalId', 'password']);
    setVisible(false);
  });
  const FullWidth = useMemo(() => ({ width: '100%' }), []);
  const FloatRight = useMemo(() => ({ float: 'right' }), []);
  const MarginBottomZero = useMemo(() => ({ marginBottom: 0 }));
  const onSubmitForm = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: form.getFieldsValue(['originalId', 'password', 'remember']),
    });
  }, []);
  useEffect(() => {
    if (visible && logInErrorReason) {
      message.warn(logInErrorReason);
    }
  }, [logInErrorReason, visible]);
  return (
    <Modal
      title="FutChall로그인"
      visible={visible}
      onOk={onSubmitForm}
      onCancel={onHandleCancel}
      centered="true"
      footer={null}
      width="320px"
    >
      <Form
        layout="horizontal"
        form={form}
        onFinish={onSubmitForm}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="originalId"
        >
          <Input placeholder="아이디" prefix={<UserOutlined className="site-form-item-icon" />} autoFocus />
        </Form.Item>

        <Form.Item
          name="password"
        >
          <Input placeholder="비밀번호" type="password" prefix={<LockOutlined className="site-form-item-icon" />} onPressEnter={onSubmitForm} />
        </Form.Item>

        <Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            noStyle
          >
            <Checkbox value="Y">아이디 기억하기</Checkbox>
          </Form.Item>
          <Link href=""><a style={FloatRight}>비밀번호 찾기</a></Link>
        </Form.Item>

        <Form.Item shouldUpdate style={MarginBottomZero}>
          {() => (
            <Button
              type="primary"
              loading={isLoggingIn}
              key="submit"
              disabled={!form.isFieldsTouched(['originalId', 'password'], true)}
              onClick={onSubmitForm}
              style={FullWidth}
            >
              로그인
            </Button>
          )}
        </Form.Item>
        또는 <Link href="/signup"><a>회원가입하기</a></Link>
      </Form>
    </Modal>
  );
};
LoginForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};
export default LoginForm;
