import React, { useCallback, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Typography, Button, Form, Input, TimePicker, Radio, Select, Upload, message, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ENROLL_STADIUM_REQUEST } from '../../../reducers/stadium';
import AppLayout from '../../../components/AppLayout';
import { multipleSpecaility } from '../../../util/columns';

const Details = (props) => {
  const { isEnrolling, isEnrolled } = useSelector((state) => state.stadium);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.router.query || !isLoggedIn) {
      message.error('비정상적인 접근입니다.');
      Router.replace('/stadia');
    }
  }, [props.router.query]);

  useEffect(() => {
    if (isEnrolled) {
      notification.success({
        message: '구장등록 완료',
        description: '구장 등록이 완료되었습니다. 구장 등록 후 3일동안 점령상태가 유지됩니다. 지속적인 점령 경기를 통해 구장 최고의 팀이 되어보세요!',
        duration: 0,
      });
      Router.replace('/stadia');
    }
  }, [isEnrolled]);
  const onSubmitForm = useCallback((values) => {
    dispatch({
      type: ENROLL_STADIUM_REQUEST,
      data: {
        ...values,
        time: `${values.time[0].format('HH:mm')}~${values.time[1].format('HH:mm')}`,
        special: values.special?.join(),
        lat: props.router.query.lat,
        lng: props.router.query.lng,
      },
    });
  });

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 14, offset: 5 }} xl={{ span: 8, offset: 8 }} xxl={{ span: 6, offset: 9 }} style={{ margin: '0 auto', border: '1px solid #dadce0', borderRadius: '8px', padding: '25px 10px' }}>
          <Row gutter={[0, 16]}>
            <Col style={{ width: '100%', textAlign: 'center' }}>
              <Typography.Title level={3} style={{ color: '#202124' }}>구장 등록하기</Typography.Title>
              <Typography style={{ color: '#202124', fontWeight: 'normal' }}>구장 상세정보</Typography>
            </Col>
          </Row>
          <Row gutter={[0, 16]}>
            <Col span={22} offset={1}>
              <Form
                wrapperCol={14}
                labelCol={6}
                layout="horizontal"
                form={form}
                initialValues={{ address: props.router.query.address, light: 'N' }}
                onFinish={onSubmitForm}
                scrollToFirstError
              >
                <Form.Item
                  name="title"
                  label="구장명"
                  rules={[{ required: true, message: '구장명을 입력하여주세요' }]}
                >
                  <Input placeholder="정식 구장명을 입력해주세요" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="주소"
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="time"
                  label="사용시간"
                  rules={[{ required: true, message: '사용가능 시간을 확인해주세요' }]}
                >
                  <TimePicker.RangePicker mode="time" use12Hours format="h:mm a" />
                </Form.Item>
                <Form.Item
                  name="light"
                  label="라이트 여부"
                >
                  <Radio.Group>
                    <Radio value="Y">있음</Radio>
                    <Radio value="N">없음</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="size"
                  label="구장 사이즈"
                  rules={[{ required: true, message: '구장 크기를 체크해주세요' }]}
                >
                  <Radio.Group>
                    <Radio value="F">풋살</Radio>
                    <Radio value="M">중형 축구장</Radio>
                    <Radio value="N">국제규격 축구장</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="special"
                  label="특징"
                >
                  <Select mode="tags" placeholder="구장의 다양한 특징을 선택해주세요">
                    {
                      multipleSpecaility.map((v, i) => {
                        return(
                          <Select.Option
                            key={i}
                          >
                            {v}
                          </Select.Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item
                  name="description"
                  label="설명"
                >
                  <Input.TextArea placeholder="구장 설명과 특징을 적어주세요" autoSize />
                </Form.Item>
                <Form.Item
                  name="picture"
                  label="사진"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="upload" listType="picture-card">
                    {uploadButton}
                  </Upload>
                </Form.Item>
                <Form.Item
                  shouldUpdate
                  wrapperCol={{
                    span: 18,
                    offset: 6,
                  }}
                  style={{ marginBottom: 0 }}
                >
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      shape="round"
                      loading={isEnrolling}
                      disabled={
                                  !form.isFieldsTouched(['title', 'size', 'time'], true)
                                  || form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                    >
                      등록하기
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </AppLayout>
  );
};

Details.propTypes = {
  props: PropTypes.shape({
    router: PropTypes.shape({
      query: PropTypes.shape({
        data: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default withRouter(Details);
