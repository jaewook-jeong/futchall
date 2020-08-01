import React, { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Avatar, Input, Button, Divider, Space } from 'antd';
import styled from 'styled-components';
import { FileImageOutlined, CalendarOutlined } from '@ant-design/icons';

const PostFormDiv = styled.div`
  border-radius: 15px;
  padding: 10px;
  border: 1px solid #f0f0f0;
  height: auto;
  margin-bottom: 10px;
  background-color: #fff;
`;
const PostForm = (props) => {
  const { where, req } = props;
  const [form] = Form.useForm();
  const { me } = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    console.log(form.getFieldsValue(['content']), me?.id);
  }, []);
  return (
    <PostFormDiv>
      <Form
        form={form}
        hideRequiredMark
        encType="multipart/form-data"
        onFinish={onSubmit}
      >
        <Form.Item
          label={<Avatar shape="circle">{me?.nickname}</Avatar>}
          colon={false}
          name="content"
          required
          // rules={[{ required: trued, message: '무슨 말을 하고 싶으신가요?' }]}
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 10 }}
            style={{ border: '1px solid #f0f0f0', borderRadius: '15px', backgroundColor: '#fafafa', color: '#000000d9' }}
            placeholder="무슨 생각을 하고 계신가요?"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          style={{ marginBottom: 0, textAlign: 'right' }}
        >
          <Space>
            <Button type="default" htmlType="button" shape="round"><FileImageOutlined />사진</Button>
            <Button type="default" htmlType="button" shape="round"><CalendarOutlined />경기 일정</Button>
            <Button type="primary" htmlType="submit" shape="round">게시하기</Button>
          </Space>
        </Form.Item>
      </Form>
    </PostFormDiv>
  );
};

PostForm.propTypes = {
  props: PropTypes.shape({
    where: PropTypes.string.isRequired,
    req: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostForm;
