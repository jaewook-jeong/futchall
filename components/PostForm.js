import React, { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Avatar, Input, Button } from 'antd';
import styled from 'styled-components';

const PostFormDiv = styled.div`
  border-radius: 15px;
  padding: 10px;
  background-color: #fafafa;
  height: auto;
`;
const PostForm = (props) => {
  const { where, req } = props;
  const [form] = Form.useForm();
  const { me } = useSelector((state) => state.user, shallowEqual);
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    console.log(form.getFieldsValue(['content']));
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
            placeholder="무슨 생각을 하고 계신가요?"
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0 }}
        >
          <Button type="primary" htmlType="submit">게시하기</Button>
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
