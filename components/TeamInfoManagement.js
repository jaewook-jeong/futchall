import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, message, Radio } from 'antd';
import { EDIT_TEAM_REQUEST } from '../reducers/team';

const TeamInfoManagement = () => {
  const { info, isEditting, editErrorReason } = useSelector((state) => state.team);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const editTeamInfo = useCallback((values) => {
    console.log(values);
    dispatch({
      type: EDIT_TEAM_REQUEST,
      data: {
        ...values,
        id: info.id,
      },
    });
  }, []);

  useEffect(() => {
    if (editErrorReason) {
      message.error(editErrorReason);
    }
  }, [editErrorReason]);

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18, offset: 1 }}
      form={form}
      onFinish={editTeamInfo}
      scrollToFirstError
      initialValues={{ ...info }}
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
        shouldUpdate
        wrapperCol={{
          span: 18,
          offset: 6,
        }}
      >
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            loading={isEditting}
            disabled={form.getFieldsError().filter(({ errors }) => errors.length).length}
          >
            등록하기
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default TeamInfoManagement;
