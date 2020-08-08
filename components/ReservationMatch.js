import React, { useCallback } from 'react';
import { Modal, Form, DatePicker, TimePicker, Input } from 'antd';
import PropTypes from 'prop-types';

const ReservationMatch = (props) => {
  const { visible, setVisible, onLoadPost, stadiumReq } = props;
  const [form] = Form.useForm();

  const onHandleCancel = useCallback(() => {
    form.resetFields(['id', 'password']);
    setVisible(false);
  });

  const onFetchPost = useCallback(() => {
    // push to clicked post
    console.log(form.getFieldsValue(['home', 'away', 'stadium']));
    // onLoadPost();
  }, []);

  return (
    <Modal
      title="일정 선택하기"
      visible={visible}
      onCancel={onHandleCancel}
      onOk={onFetchPost}
      centered
      footer={null}
    >
      <Form
        layout="horizontal"
        form={form}
        onFinish={onFetchPost}
        initialValues={{ stadiumReq }}
      >
        <Form.Item name="date">
          <DatePicker />
          <TimePicker />
        </Form.Item>
        <Form.Item name="stadiumReq">
          <Input />
        </Form.Item>
      </Form>

    </Modal>
  );
};

ReservationMatch.propTypes = {
  props: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    onLoadPost: PropTypes.func.isRequired,
    stadiumReq: PropTypes.number,
  }).isRequired,
};

export default ReservationMatch;
