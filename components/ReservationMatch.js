import React, { useCallback } from 'react';
import { Modal, Form, DatePicker, Input, Button, message } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const ReservationMatch = ({ visible, setVisible, onLoadPost, stadiumReq, setEnrollment }) => {
  const [form] = Form.useForm();

  const onHandleCancel = useCallback(() => {
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
  message.info('점령전은 팀 주장이 신청할 수 있습니다!');
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
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onLoadPost: PropTypes.func.isRequired,
  stadiumReq: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  setEnrollment: PropTypes.func.isRequired,
};

export default ReservationMatch;
