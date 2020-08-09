import React, { useCallback } from 'react';
import { Modal, Form, DatePicker, TimePicker, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const ReservationMatch = (props) => {
  const { visible, setVisible, onLoadPost, stadiumReq, setEnrollment } = props;
  const [form] = Form.useForm();

  const onHandleCancel = useCallback(() => {
    form.resetFields(['id', 'password']);
    setVisible(false);
  });

  const onFetchPost = useCallback(() => {
    // push to clicked post
    onLoadPost({
      stadiumTitle: form.getFieldValue('stadiumTitle'),
      day: form.getFieldValue('day').format('YYYY-MM-DD'),
      time: form.getFieldValue('time').format('HH:mm'),
    });
    setVisible(false);
    setEnrollment(true);
  }, []);

  return (
    <Modal
      title="일정 선택하기"
      visible={visible}
      onCancel={onHandleCancel}
      centered
      footer={null}
    >
      <Form
        layout="horizontal"
        form={form}
        onFinish={onFetchPost}
        initialValues={{ stadiumReq }}
      >
        <Form.Item name="day" label="날짜" colon={false}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="time" label="시간" colon={false}>
          <TimePicker
            use12Hours
            format="h:mm a"
          />
        </Form.Item>
        <Form.Item
          name="stadiumTitle"
          label="경기장"
          colon={false}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={onFetchPost}
          >
            일정 생성
          </Button>
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
    stadiumReq: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]).isRequired,
    setEnrollment: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReservationMatch;
