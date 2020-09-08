import React, { useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Typography, Button, Form, Input, Radio, Upload, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import axios from 'axios';

import { ENROLL_TEAM_REQUEST } from '../../reducers/team';
import AppLayout from '../../components/AppLayout';
import imageUploader from '../../util/imageUploader';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const TeamRegister = () => {
  // const [, forceUpdate] = useState(); // when you com back to this page, to delete previous data
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isEnrolling, isEnrolled } = useSelector((state) => state.team);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [dbImage, setDbImage] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      Router.replace('/stadia');
      message.warn('잘못된 접근입니다!');
    }
  }, []);
  const onSubmitForm = useCallback((values) => {
    console.log(values, dbImage);
    dispatch({
      type: ENROLL_TEAM_REQUEST,
      data: {
        ...values,
        image: dbImage,
      },
    });
  }, [dbImage]);
  useEffect(() => {
    if (isEnrolled) {
      notification.success({
        message: '팀 등록 완료',
        description: '팀 등록이 완료되었습니다. 구장을 점령하여 최고의 팀으로 이끄세요!',
        duration: 10,
      });
      Router.replace('/stadia');
    }
  }, [isEnrolled]);
  // useEffect(() => {
  //   forceUpdate({});
  // }, []);
  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 14, offset: 5 }} xl={{ span: 8, offset: 8 }} xxl={{ span: 6, offset: 9 }} style={{ margin: '0 auto', border: '1px solid #dadce0', borderRadius: '8px', padding: '30px 10px' }}>
          <Row gutter={[0, 16]}>
            <Col style={{ width: '100%', textAlign: 'center' }}>
              <Typography.Title level={3} style={{ color: '#202124' }}>팀 등록하기</Typography.Title>
            </Col>
          </Row>
          <Row gutter={[0, 16]}>
            <Col span={22} offset={1}>
              <Form
                labelCol={10}
                wrapperCol={14}
                layout="horizontal"
                form={form}
                initialValues={{ recruit: 'N' }}
                onFinish={onSubmitForm}
                scrollToFirstError
              >
                <Form.Item
                  name="title"
                  label="팀명"
                  rules={[{ required: true, message: '팀명을 입력하여주세요' }]}
                >
                  <Input placeholder="팀명을 입력해주세요" />
                </Form.Item>
                <Form.Item
                  name="location"
                  label="팀 활동 지역"
                  rules={[{ required: true, message: '팀 활동 지역을 입력하여주세요' }]}
                >
                  <Input placeholder="활동 지역을 입력해주세요" />
                </Form.Item>
                <Form.Item
                  name="time"
                  label="모임시간"
                  rules={[{ required: true, message: '주로 모이는 요일과 시간을 적어주세요' }]}
                >
                  <Input placeholder="ex)매주 수요일 저녁8시부터" />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="팀 소개"
                >
                  <Input.TextArea placeholder="팀을 소개해 주세요!" autoSize />
                </Form.Item>
                <Form.Item
                  name="recruit"
                  label="회원 모집여부"
                >
                  <Radio.Group>
                    <Radio value="Y">회원 모집</Radio>
                    <Radio value="N" checked>회원 비모집</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="팀 메인사진"
                >
                  <Upload
                    listType="picture-card"
                    action={(file) => imageUploader('http://localhost:3065/team/image', file).then((response) => setDbImage(response.data))}
                    onRemove={() => setDbImage('')}
                  >
                    { !dbImage
                      && (
                      <div>
                        <PlusOutlined />
                        <div>Upload</div>
                      </div>
                      )}
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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default TeamRegister;
