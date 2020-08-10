import React, { useCallback } from 'react';
import { Modal, Form, DatePicker, TimePicker, Input, Button } from 'antd';
import moment from 'moment';
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
      date: form.getFieldValue('date').format('YYYY-MM-DD HH:mm'),
    });
    setVisible(false);
    setEnrollment(true);
  }, []);

  const disabledDate = useCallback((current) => current && current < moment().endOf('day'), []);

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
        <Form.Item name="date" label="일정" colon={false}>
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
          />
        </Form.Item>
        <Form.Item
          name="stadiumTitle"
          label="장소"
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
